import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CronlogsApi } from './cronlogs.api';
import { iCronLog, iCronLogPage } from './cronlogs.interface';

@Injectable({
	providedIn: 'root'
})
export class CronlogsService {
	constructor(
		private api: CronlogsApi,
	) { }

	private getLogFromData(data: any): iCronLog {
		return {
			id: +data['id'],
			name: data['name'],
			hitpoint: data['hitpoint'],
			status: data['status'],
			result: data['result'],
			timestart: data['timestart'],
			timeend: data['timeend'],
			createdAt: data['created_at'],
		};
	}

	public getLogs(page: number = 0): Observable<iCronLogPage> {
		return this.api.getLogs(page).pipe(
			map((rs: any) => ({
				items: (rs.data ?? []).map((l: any) => this.getLogFromData(l)),
				page: rs.page ?? page,
				hasMore: !!rs.has_more,
				total: rs.total,
			}))
		);
	}

	public deleteOlderThan(before: string): Observable<{ deleted: number }> {
		return this.api.deleteOlderThan(before);
	}
}
