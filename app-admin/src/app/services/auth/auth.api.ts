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
		let url = this.url("/login");
		return this.ApiService
			.postApi(url, data);
	}

	public GetToken(token: string): Observable<any> {
		let url = this.url("/token");
		return this.ApiService
			.getApi(url);
	}

	public GetVersionInfo(): Observable<any> {
		let url = this.url("/version/");
		return this.ApiService.getApi(url);
	}


	// public GetUsers(): Promise<any> {
	// 	let url = this.url("/users").get();
	// 	return this.ApiService
	// 		.getApi(url)
	// 		.toPromise();
	// }
	// public PostUsers(data: any): Promise<any> {
	// 	let url = this.url("/users").get();
	// 	return this.ApiService
	// 		.postApi(url, data)
	// 		.toPromise();
	// }
	// public PutUser(id: string, data: any): Promise<any> {
	// 	let url = this.url("/user/:id")
	// 		.params({ id: id })
	// 		.get();
	// 	return this.ApiService
	// 		.putApi(url, data)
	// 		.toPromise();
	// }
	// public PostChangePassword(id: string, data: any): Promise<any> {
	// 	let url = this.url("user/:id/change-password")
	// 		.params({ id: id })
	// 		.get();
	// 	return this.ApiService
	// 		.postApi(url, data)
	// 		.toPromise();
	// }

}