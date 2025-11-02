import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iApikey } from "./apikey.interface";

@Injectable()
export class ApikeyApi extends BaseApi {
	private endpointSingular: string = "/key";
	private endpointPlural: string = this.endpointSingular + "s";
	constructor( injector: Injector ) { super(injector); }

	public create(data: iApikey): Observable<any> {
		return this.post(this.url(this.endpointPlural), data).pipe(this.defaultMap);
	}
	public list(): Observable<any> {
		return this.get(this.url(this.endpointPlural)).pipe(this.defaultMap);
	}
	public view(id:number): Observable<any> {
		return this.get(this.url(this.endpointSingular + "/:id").params({id})).pipe(this.defaultMap);
	}
	public update(id:number, data: iApikey): Observable<any> {
		return this.put(this.url(this.endpointSingular + "/:id").params({id}), data).pipe(this.defaultMap);
	}
	public viewKey(key:string): Observable<any> {
		return this.get(this.url(this.endpointSingular + "/:key/view").params({key})).pipe(this.defaultMap);
	}
	public getEmails(key:string): Observable<any> {
		return this.get(this.url(this.endpointSingular + "/:key/emails").params({key})).pipe(this.defaultMap);
	}

}
