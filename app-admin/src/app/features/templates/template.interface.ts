import { iObject } from "@app/shared/_general";

export interface iTemplateVars {
	[name: string]: { default: string };
}

export interface iTemplate extends iObject {
	name: string;
	source_id: number | null;
	description: string;
	subject: string;
	content: string;
	vars: iTemplateVars;
	active: boolean;
}

export interface iPromise extends iObject {
	sourceId: number;
	originKey: string;
	mailType: string;
	to: string;
	subject: string;
	priority: number;
	vars: string;
	templateId: number;
	mailId: number | null;
	processed: boolean;
	processedDate: string | null;
	createdAt: string;
	failed: boolean;
}
