import { Injectable } from '@angular/core';
import { EmailApi } from './email.api';
import { iEmail } from './email.interface';
import { map, Observable } from 'rxjs';

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
}
