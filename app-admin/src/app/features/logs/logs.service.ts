import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { iLog } from './logs.interface';
import { LogsApi } from './logs.api';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(
		private api: LogsApi,
	) { }

	public getObjFromData(i: any): iLog {
		let data: iLog = {
			id: i['id'],
			user_id: i['user_id'],
			action: i['action'],
			victim: i['victim'],
			info: i['info'],
			created_at: i['created_at'],
			updated_at: i['updated_at'],
		};
		return data;
	}

	private getLogList(data: any[]): iLog[] {
		return data.map((i) => this.getObjFromData(i));
	}

	public getLogs(page:number=0): Observable<any> {
		return this.api.getLogs(page)
			.pipe(
				map((rs: any) => {
					return {
						page: rs["page"],
						has_more: rs["has_more"],
						data: this.getLogList(rs["data"])
					};
				})
			);
	}

}
