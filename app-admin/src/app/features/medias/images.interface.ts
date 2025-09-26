import { IObjectKeys } from "@app/shared/_general";

export interface iImage extends IObjectKeys {
	id: number;
	name: string;
	filename: string;
	extension?: string;
	folder?: string;
	width?: number;
	height?: number;
	type?: string;
	size?: number;
	date?: string;
}
