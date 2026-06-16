import { IObjectKeys } from "@app/shared/_general";

export interface iLog extends IObjectKeys {
	id: number;
	user_id: number;
	action: string;
	victim: string;
	info?: string;
	created_at: string;
	updated_at: string;
}
