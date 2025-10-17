import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { iSource } from "./source.interface";

@Injectable()
export class SourcesApi extends BaseApi {
	constructor( injector: Injector ) { super(injector); }

	public create(data: iSource): Observable<any> {
		return this.post(this.url("/sources"), data).pipe(this.defaultMap);
	}
	public list(): Observable<any> {
		return this.get(this.url("/sources")).pipe(this.defaultMap);
	}
	public view(id:number): Observable<any> {
		return this.get(this.url("/source/:id").params({id})).pipe(this.defaultMap);
	}
	public update(id:number, data: iSource): Observable<any> {
		return this.put(this.url("/source/:id").params({id}), data).pipe(this.defaultMap);
	}

}
