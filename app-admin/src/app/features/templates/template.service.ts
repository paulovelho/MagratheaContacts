import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TemplatesApi } from './template.api';
import { iPromise, iTemplate, iTemplateVars } from './template.interface';

// same placeholder syntax as the server (Templates::ExtractVars)
export const TEMPLATE_VAR_REGEX = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

/**
 * Client-side {{placeholder}} extraction for instant feedback;
 * the server re-extracts on save (Templates::SyncVars) and is the source of truth.
 */
export function extractTemplateVars(subject: string, content: string): string[] {
	const names: string[] = [];
	const text = (subject ?? "") + "\n" + (content ?? "");
	for (const match of text.matchAll(TEMPLATE_VAR_REGEX)) {
		if (!names.includes(match[1])) names.push(match[1]);
	}
	return names;
}

export function renderTemplate(text: string, values: { [name: string]: string }): string {
	return (text ?? "").replace(TEMPLATE_VAR_REGEX, (_, name) => values[name] ?? "");
}

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
	constructor(
		private api: TemplatesApi,
	) {}

	private getTemplateFromData(data: any): iTemplate {
		let vars: iTemplateVars = {};
		try {
			vars = data["vars"] ? JSON.parse(data["vars"]) : {};
		} catch { vars = {}; }
		return {
			id: +data["id"],
			name: data["name"],
			source_id: data["source_id"] == null ? null : +data["source_id"],
			description: data["description"] ?? "",
			subject: data["msg_subject"] ?? "",
			content: data["content"] ?? "",
			vars,
			active: !!+data["active"],
		};
	}

	private getPromiseFromData(data: any): iPromise {
		const processed = !!+data["processed"];
		const mailId = data["mail_id"] == null ? null : +data["mail_id"];
		return {
			id: +data["id"],
			sourceId: +data["source_id"],
			originKey: data["origin_key"],
			mailType: data["mail_type"],
			to: data["email_to"],
			subject: data["msg_subject"],
			priority: +data["priority"],
			vars: data["vars"],
			templateId: +data["template_id"],
			mailId,
			processed,
			processedDate: data["processed_date"],
			createdAt: data["created_at"],
			failed: processed && mailId == null,
		};
	}

	private getDataFromTemplate(template: iTemplate): any {
		return {
			name: template.name,
			source_id: template.source_id,
			description: template.description,
			msg_subject: template.subject,
			content: template.content,
			vars: JSON.stringify(template.vars),
			active: !!template.active,
		};
	}

	public list(): Observable<iTemplate[]> {
		return this.api.list()
			.pipe(map((rs: any) => rs.map((t: any) => this.getTemplateFromData(t))));
	}

	public getOne(id: number): Observable<iTemplate> {
		return this.api.getOne(id)
			.pipe(map(rs => this.getTemplateFromData(rs)));
	}

	public create(template: iTemplate): Observable<any> {
		return this.api.create(this.getDataFromTemplate(template));
	}

	public update(id: number, template: iTemplate): Observable<any> {
		return this.api.update(id, this.getDataFromTemplate(template));
	}

	public remove(id: number): Observable<any> { return this.api.remove(id); }

	public getPromisesBySource(sourceId: number): Observable<iPromise[]> {
		return this.api.getPromisesBySource(sourceId)
			.pipe(map((rs: any) => rs.map((p: any) => this.getPromiseFromData(p))));
	}

	public getPromisesByTemplate(templateId: number): Observable<iPromise[]> {
		return this.api.getPromisesByTemplate(templateId)
			.pipe(map((rs: any) => rs.map((p: any) => this.getPromiseFromData(p))));
	}

	public createPromise(data: any): Observable<any> {
		return this.api.createPromise(data);
	}

	public getPromise(id: number): Observable<iPromise> {
		return this.api.getPromise(id)
			.pipe(map((rs: any) => this.getPromiseFromData(rs)));
	}

	public processPromise(id: number): Observable<any> {
		return this.api.processPromise(id);
	}

	public extractVars = extractTemplateVars;
	public render = renderTemplate;
}
