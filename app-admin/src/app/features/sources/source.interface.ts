import { IObjectKeys } from "@app/shared/_general";

export interface iSource extends IObjectKeys {
	name: string;
	mail_from: string;
	smtp_id?: number;
}
