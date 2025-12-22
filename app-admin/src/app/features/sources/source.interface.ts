import { iObject, IObjectKeys } from "@app/shared/_general";

export interface iSource extends iObject {
	name: string;
	mail_from?: string;
	smtp_id?: number;
}
