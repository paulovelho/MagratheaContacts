import { IObjectKeys } from "@app/shared/_general";

export interface iRanking extends IObjectKeys {
	id: number;
	position: number;
	points: number;
	user: string;
	location: string;
	sent_in: string;
	deaths?: any;
}
export interface iRankingDeath extends IObjectKeys {
	id: number;
	name: string;
	points: number;
}
