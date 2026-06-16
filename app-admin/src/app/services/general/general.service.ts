import { Injectable } from '@angular/core';
import { BaseApi } from '../api/base.api';
import { map, Observable } from 'rxjs';

@Injectable()
export class GeneralApi extends BaseApi {
	public getSentEnum(): Observable<any> {
		return this.get(this.url("/enum/status"), true).pipe(this.defaultMap);
	}
}

@Injectable()
export class GeneralService {
	public sentStatus: string[] = [];
	constructor(
		private api: GeneralApi,
	) { }

	public loadEnums(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.api.getSentEnum()
				.subscribe({
					next: (rs) => {
						Object.entries(rs)
							.forEach(
								([key, val]) => {
									const value = +val!
									this.sentStatus[value] = key;
								}
							);
						resolve(rs);
					},
					error: (err) => reject(err),
				});
		})
	}
	public async getEnumById(statusId: number): Promise<string> {
		if(this.sentStatus.length == 0) {
			await this.loadEnums();
		}
		return this.sentStatus[statusId];
	}

}
