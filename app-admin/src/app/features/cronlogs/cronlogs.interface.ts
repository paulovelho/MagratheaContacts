import { IObjectKeys } from "@app/shared/_general";

export interface iCronLog extends IObjectKeys {
	id: number;
	name: string;
	hitpoint: string;
	status: string;
	result: string;
	timestart: string;
	timeend: string;
	createdAt: string;
}

export interface iCronLogPage {
	items: iCronLog[];
	page: number;
	hasMore: boolean;
	total?: number;
}
