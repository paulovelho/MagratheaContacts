import { IObjectKeys } from "@app/shared/_general";

export interface iUser extends IObjectKeys {
	id: number;
	name: string;
	email: string;
	year: number;
	city?: string;
	state?: string;
	points: number;
	link?: string;
	list: any;
	created_at: string;
	test?: boolean;
}
