import { IObjectKeys } from "@app/shared/_general";

export interface iSmtp extends IObjectKeys {
	name: string;
	description: string;
	host: string;
	port: string;
	user: string;
	password: string;
	tls_encrypt: boolean;
}