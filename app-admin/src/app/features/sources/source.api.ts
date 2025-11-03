import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iSource } from "./source.interface";

@Injectable()
export class SourcesApi extends BaseApi {
	private endpointSingular: string = "/source";
	private endpointPlural: string = this.endpointSingular + "s";
	constructor( injector: Injector ) { super(injector); }

	public create(data: iSource): Observable<any> {
		return this.post(this.url(this.endpointPlural), data).pipe(this.defaultMap);
	}
	public list(cache: boolean = false): Observable<any> {
		return this.get(this.url(this.endpointPlural), cache).pipe(this.defaultMap);
	}
	public view(id:number): Observable<any> {
		return this.get(this.url(this.endpointSingular + "/:id").params({id})).pipe(this.defaultMap);
	}
	public update(id:number, data: iSource): Observable<any> {
		return this.put(this.url(this.endpointSingular + "/:id").params({id}), data).pipe(this.defaultMap);
	}

}
