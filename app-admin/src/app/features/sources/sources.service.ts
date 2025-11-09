import { Injectable } from '@angular/core';
import { SourcesApi } from './source.api';
import { iSource } from './source.interface';
import { map, Observable, tap } from 'rxjs';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
	public sourceNames: string[] = [];
	constructor(
		private api: SourcesApi,
	) { }

	private getSourceFromData(data: any): iSource {
		return {
			id: +data["id"],
			name: data["name"],
			mail_from: data["mail_from"],
			smtp_id: +data["smtp_id"],
		};
	}

	public list(): Observable<iSource[]> {
		return this.api.list()
			.pipe(
				map((rs: any) => rs.map((i: any) => this.getSourceFromData(i)))
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

	public async getNameById(id:number): Promise<string> {
		if( this.sourceNames.length == 0 ) {
			await this.getSourceList();
		}
		return this.sourceNames[id];
	}
	public getSourceList(): Promise<iSelectOption[]> {
		return new Promise((resolve, reject) => { 
			this.api.list(true)
				.pipe(
					map((rs: any) => rs.map(
						(i: any) => {
							this.sourceNames[+i["id"]] = i["name"];
							return { label: i["name"], value: +i["id"]};
						}
					))
				)
				.subscribe({
					next: (rs) => resolve(rs),
					error: (err) => reject(err),
				});
		});
	}
}
