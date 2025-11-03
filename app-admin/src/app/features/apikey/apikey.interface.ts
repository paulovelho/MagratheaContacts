import { IObjectKeys } from "@app/shared/_general";

export interface iApikey extends IObjectKeys {
	id: number;
	source_id: number;
	val: string;
	description: string;
	priority?: number;
	uses: number;
	usageLimit?: number;
	expiration?: string;
	simulate: boolean;
	active: boolean;
}
