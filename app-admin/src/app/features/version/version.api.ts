import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";

@Injectable()
export class VersionApi extends BaseApi {
	constructor( injector: Injector ) { super(injector); }

	public version(): Observable<any> {
		return this.get(this.url("/version")).pipe(this.defaultMap);
	}

	public changelog(): Observable<any> {
		const url = this.url("/changelog")
			.setContentType("text/plain")
			.setResponseType("text");
		return this.
			get(url);
	}

}
