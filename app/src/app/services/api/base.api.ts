import { Injectable, Injector, inject } from "@angular/core";
import { Observable, OperatorFunction, map } from 'rxjs';

import { ApiService } from "@services/api/api.service";
import { CacheInterceptor } from "./cache-interceptor/cache.interceptor";
import { environment } from "@environments/environment";

export class UrlBuilder {
	private base: string = "";
	private endpoint: string;
	private url: string;

	constructor(base: string, endpoint:string="") {
		this.base = base;
		this.endpoint = endpoint;
		this.url = this.base + endpoint;
	}

	private replaceUrlParams(url: string, key: string, value: string): string {
		return url.replace(new RegExp(':' + key, 'g'), value);
	}

	public params(data: any): this {
		for (let key in data) {
			let v = data[key];
			this.url = this.replaceUrlParams(this.url, key, v);
		}
		return this;
	}

	public queryParams(data: any): this {
		let query = [];
		for (let key in data) {
			query.push(key + "=" + data[key]);
		}
		this.url += "?" + query.join("&");
		return this;
	}

	public get(): string { return this.url; }
	public toString(): string { return this.url; }

}

@Injectable()
export class BaseApi {

	protected ApiService: ApiService;
	protected Cache: CacheInterceptor;
	protected base: string = "";

	protected defaultMap: OperatorFunction<any, any> = map((rs: any) => {
		if (rs.success) return rs.data;
		else throw new Error(rs?.error ?? rs?.message);
	});

	constructor(
		injector: Injector
	) {
		this.ApiService = injector.get(ApiService);
		this.Cache = injector.get(CacheInterceptor);
		this.base = environment.api;
	}

	public setBase(url: string) {
		this.base = url;
	}

	public url(endpoint: string): UrlBuilder {
		let urlB = new UrlBuilder(this.base, endpoint);
		return urlB;
	}
	public createUrl(url: string): UrlBuilder {
		return new UrlBuilder("", url);
	}
	protected clearCache(url: UrlBuilder): void {
		return this.Cache.unCache(url.get());
	}

	protected get(url: UrlBuilder, cached: boolean|null = null): Observable<any> {
		let cache: boolean = cached ?? false;
		return this.ApiService
			.getApi(url.get(), null, cache);
	}
	protected post(url: UrlBuilder, data: any): Observable<any> {
		return this.ApiService
			.postApi(url.get(), data);
	}
	protected put(url: UrlBuilder, data: any): Observable<any> {
		return this.ApiService
			.putApi(url.get(), data);
	}
	protected del(url: UrlBuilder): Observable<any> {
		return this.ApiService
			.deleteApi(url.get());
	}
	protected upload(url: UrlBuilder, file: any[], payload: any): Observable<any> {
		return this.ApiService
			.uploadApi(url.get(), file, payload);
	}
	protected download(url: UrlBuilder): Observable<any> {
		return this.ApiService
			.fileApi(url.get());
	}



}