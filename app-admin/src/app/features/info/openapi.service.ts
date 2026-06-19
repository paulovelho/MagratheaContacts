import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as yaml from 'js-yaml';

export interface OpenApiInfo {
	title: string;
	description: string;
	version: string;
}

export interface OpenApiField {
	name: string;
	type: string;
	required: boolean;
	description?: string;
	format?: string;
	nullable?: boolean;
	enum?: any[];
}

export interface OpenApiRequestBody {
	required: boolean;
	fields: OpenApiField[];
}

export interface OpenApiResponse {
	status: string;
	description: string;
	fields: OpenApiField[];
}

export interface OpenApiEndpoint {
	path: string;
	method: string;
	summary: string;
	tags: string[];
	auth: boolean;
	requestBody?: OpenApiRequestBody;
	responses: OpenApiResponse[];
}

export interface ParsedOpenApi {
	info: OpenApiInfo;
	endpoints: OpenApiEndpoint[];
	tags: string[];
}

function resolveRef(ref: string, components: any): any {
	// Only handles local JSON pointer refs like #/components/schemas/Foo
	const parts = ref.replace('#/', '').split('/');
	return parts.reduce((obj, key) => obj?.[key], components);
}

function resolveSchema(schema: any, components: any): any {
	if (!schema) return {};
	if (schema.$ref) return resolveSchema(resolveRef(schema.$ref, { components }), components);
	if (schema.allOf) {
		return schema.allOf.reduce((merged: any, sub: any) => {
			const resolved = resolveSchema(sub, components);
			return {
				...merged,
				properties: { ...(merged.properties ?? {}), ...(resolved.properties ?? {}) },
				required: [...(merged.required ?? []), ...(resolved.required ?? [])],
			};
		}, {});
	}
	return schema;
}

function extractFields(schema: any, components: any): OpenApiField[] {
	const resolved = resolveSchema(schema, components);
	const props = resolved.properties ?? {};
	const required: string[] = resolved.required ?? [];
	return Object.entries<any>(props).map(([name, prop]) => {
		const resolvedProp = prop.$ref ? resolveSchema(prop, components) : prop;
		return {
			name,
			type: resolvedProp.type ?? (resolvedProp.$ref ? 'object' : 'any'),
			required: required.includes(name),
			description: resolvedProp.description,
			format: resolvedProp.format,
			nullable: resolvedProp.nullable,
			enum: resolvedProp.enum,
		};
	});
}

function resolveResponseBody(responseObj: any, components: any): any {
	if (responseObj.$ref) {
		const resolved = resolveRef(responseObj.$ref, { components });
		return resolveResponseBody(resolved, components);
	}
	return responseObj;
}

function extractResponseFields(responseObj: any, components: any): OpenApiField[] {
	const response = resolveResponseBody(responseObj, components);
	const schema = response?.content?.['application/json']?.schema;
	if (!schema) return [];
	// For allOf wrapping SuccessResponse + data, try to find the inner data schema
	if (schema.allOf) {
		const merged = resolveSchema(schema, components);
		const dataSchema = merged.properties?.data;
		if (dataSchema) return extractFields(dataSchema, components);
		return extractFields(merged, components);
	}
	return extractFields(schema, components);
}

@Injectable()
export class OpenApiService {
	load(url = 'openapi.yaml'): Observable<ParsedOpenApi> {
		return from(
			fetch(url)
				.then(r => r.text())
				.then(text => {
					const doc = yaml.load(text) as any;
					const components = doc.components ?? {};
					const endpoints: OpenApiEndpoint[] = [];

					for (const [path, methods] of Object.entries<any>(doc.paths ?? {})) {
						for (const [method, op] of Object.entries<any>(methods)) {
							// Request body
							let requestBody: OpenApiRequestBody | undefined;
							const rb = op.requestBody;
							if (rb) {
								const resolvedRb = rb.$ref
									? resolveRef(rb.$ref, { components })
									: rb;
								const bodySchema =
									resolvedRb?.content?.['application/json']?.schema ??
									resolvedRb?.content?.['application/x-www-form-urlencoded']?.schema;
								requestBody = {
									required: resolvedRb?.required ?? false,
									fields: bodySchema ? extractFields(bodySchema, components) : [],
								};
							}

							// Responses
							const responses: OpenApiResponse[] = Object.entries<any>(op.responses ?? {}).map(
								([status, resp]) => ({
									status,
									description: resolveResponseBody(resp, components)?.description ?? '',
									fields: extractResponseFields(resp, components),
								})
							);

							endpoints.push({
								path,
								method: method.toUpperCase(),
								summary: op.summary ?? '',
								tags: op.tags ?? [],
								auth: !!(op.security ?? doc.security),
								requestBody,
								responses,
							});
						}
					}

					return {
						info: doc.info,
						endpoints,
						tags: (doc.tags ?? []).map((t: any) => t.name),
					} as ParsedOpenApi;
				})
		);
	}
}
