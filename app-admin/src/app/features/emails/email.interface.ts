import { IObjectKeys } from "@app/shared/_general";
import { MailStatus } from "./mailStatus.enum";

export interface iEmailData {
	key: string;
	to: string;
	subject: string;
	message: string;
	mailType?: string;
}

export interface iEmail extends IObjectKeys {
	sourceId: number;
	originKey: string;
	mailType: string;
	from: string;
	to: string;
	replyTo: string;
	subject: string;
	message: string;
	priority: number;
	addDate: string;
	sentDate: string;
	status: MailStatus,
};
