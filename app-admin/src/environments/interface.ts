import { IObjectKeys } from "@app/shared/_general";

export interface iEnv extends IObjectKeys {
	envName: string;
	dev: boolean;
  production: boolean;
	debug: boolean;
  api: string;
	title: string;
}

export interface ClientData {
	name: string;
	title: string;
	description: string;
	project: string;
	active: boolean;
}
