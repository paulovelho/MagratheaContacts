import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iEmail } from "./email.interface";
import { iFilter } from "./email-filter/email-filter.component";

@Injectable()
export class EmailApi extends BaseApi {
	constructor( injector: Injector ) { super(injector); }

	public add(data: iEmail): Observable<any> {
		return this.post(this.url("/email"), data).pipe(this.defaultMap);
	}
	public addAndSend(data: iEmail): Observable<any> {
		return this.post(this.url("/send"), data).pipe(this.defaultMap);
	}
	public processNext(): Observable<any> {
		return this.post(this.url("/proccess"), null).pipe(this.defaultMap);
	}
	public getBySource(sourceId: number): Observable<any> {
		return this.get(this.url("/source/:source/emails").params({ source: sourceId })).pipe(this.defaultMap);
	}
	public getByApikey(apikeyId: number): Observable<any> {
		return this.get(this.url("/key/:key/emails").params({ key: apikeyId })).pipe(this.defaultMap);
	}
	public filterEmail(source_id: number, filter: iFilter): Observable<any> {
		return this.get(
			this.url("/source/:source/filter")
				.params({ source: source_id })
				.queryParams(filter)
		).pipe(this.defaultMap);
	}

}
