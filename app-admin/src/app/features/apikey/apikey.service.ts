import { Injectable } from '@angular/core';
import { ApikeyApi } from './apikey.api';
import { iApikey } from './apikey.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {
	constructor(
		private api: ApikeyApi,
	) { }

	private getApikeyFromData(data: any): iApikey {
		console.log("gettin g", data);
		return {
			id: +data["id"],
			source_id: +data["source_id"],
			val: data["val"],
			description: data["description"],
			priority: +data["priority"],
			uses: +data["uses"],
			usageLimit: data["usageLimit"] ? +data["usageLimit"] : 0,
			expiration: data["expiration"],
			simulate: (+data["simulate"] == 1),
			active: (+data["active"] == 1),
		};
	}

	public list(): Observable<iApikey[]> {
		return this.api.list()
			.pipe(
				map((rs: any) => rs.map((i: any) => this.getApikeyFromData(i)))
			);
	};
	public view(id:number): Observable<iApikey> {
		return this.api.view(id)
			.pipe(tap(rs => this.getApikeyFromData(rs)));
	}
	public create(data: iApikey): Observable<any> {
		return this.api.create(data);
	}
	public update(id:number, data: Partial<iApikey>): Observable<any> {
		return this.api.update(id, data);
	}
	public createKey(): Observable<string> {
		return this.api.createKey();
	}
	public getBySource(sourceId: number): Observable<iApikey[]> {
		return this.api.getBySource(sourceId)
			.pipe(map((rs: any) => rs.map((i: any) => this.getApikeyFromData(i))));
	}

}