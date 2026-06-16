import { Injectable } from '@angular/core';
import { EmailApi } from './email.api';
import { iEmail } from './email.interface';
import { map, Observable } from 'rxjs';
import { MailStatus } from './mailStatus.enum';
import { iFilter } from './email-filter/email-filter.component';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(
		private api: EmailApi,
	) { }

	private getEmailFromData(data: any): iEmail {
		return {
			sourceId: +data['source_id'],
			originKey: data['origin_key'],
			mailType: data['mail_type'],
			from: data['email_from'],
			to: data['email_to'],
			replyTo: data['email_replyTo'],
			subject: data['msg_subject'],
			message: data['message'],
			priority: +data['priority'],
			addDate: data['add_date'],
			sentDate: data['sent_date'],
			status: data['sent_status'],
		};
	}

	public getBySource(sourceId: number): Observable<iEmail[]> {
		return this.api.getBySource(sourceId)
			.pipe(
				map((rs: any) => rs.map((e:any) => this.getEmailFromData(e)))
			);
	}

	public getMailStatus(): { id: number, name: string }[] {
		return Object.keys(MailStatus)
			.filter(key => !isNaN(Number(MailStatus[key as any])))
			.map(key => ({
				id: MailStatus[key as keyof typeof MailStatus] as number,
				name: key
			}));
	}

	public filter(source_id: number, filter: iFilter): Observable<iEmail[]> {
		return this.api.filterEmail(source_id, filter)
			.pipe(
				map((rs: any) => rs.map((e:any) => this.getEmailFromData(e)))
			);
	}
}
