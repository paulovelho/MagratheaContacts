import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { BaseApi } from '@services/api/base.api';

/*
	UPDATES:
	GetToken - ionic-stock, 2021-04-28
*/
@Injectable()
export class AuthApi extends BaseApi {

	constructor(
		injector: Injector
	) {
		super(injector);
	}

	public PostAuth(data: any): Observable<any> {
		let url = this.url("/login").get();
		return this.ApiService
			.postApi(url, data);
	}

	public GetToken(token: string): Observable<any> {
		let url = this.url("/token").get();
		return this.ApiService
			.getApi(url);
	}

	public GetVersionInfo(): Observable<any> {
		let url = this.url("/version/").get();
		return this.ApiService.getApi(url);
	}

}