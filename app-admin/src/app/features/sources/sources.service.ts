import { Injectable } from '@angular/core';
import { SourcesApi } from './source.api';
import { iSource } from './source.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
	constructor(
		private api: SourcesApi,
	) { }

	private getSourceFromData(data: any): iSource {
		return {
			name: data["name"],
			mail_from: data["mail_from"],
			smtp_id: data["smtp_id"],
		};
	}

	public list(): Observable<iSource[]> {
		return this.api.list()
			.pipe(
				map((rs: any) => { return rs.data.map((i: any) => this.getSourceFromData(i)); })
			);
	};
	public view(id:number): Observable<iSource> {
		return this.api.view(id)
			.pipe(tap(rs => this.getSourceFromData(rs)));
	}
	public create(data: iSource): Observable<any> {
		return this.api.create(data);
	}
	public update(id:number, data: iSource): Observable<any> {
		return this.api.update(id, data);
	}
  
}
