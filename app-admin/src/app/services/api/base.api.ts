import { Injectable, Injector, inject } from "@angular/core";
import { Observable, OperatorFunction, map } from 'rxjs';

import { ApiService } from "@services/api/api.service";
import { CacheInterceptor } from "./cache-interceptor/cache.interceptor";
import { ConfigService } from "@services/config/config.service";

/**
 * A utility class for building URLs in a fluent, chainable manner.
 * It handles path parameters and query strings.
 *
 * @example
 * const url = new UrlBuilder('https://api.example.com', '/users/:id')
 *   .params({ id: 123 })
 *   .queryParams({ active: true })
 *   .get(); // https://api.example.com/users/123?active=true
 */
export class RequestBuilder {
	private base: string = "";
	private endpoint: string;
	private url: string;
	public contentType?: string|null = null;
	public responseType?: "json" | "text" | "blob" = "json";
	constructor(base: string, endpoint:string="") {
		this.base = base;
		this.endpoint = endpoint;
		this.url = this.base + endpoint;
	}

	private replaceUrlParams(url: string, key: string, value: string): string {
		return url.replace(new RegExp(':' + key, 'g'), value);
	}

	public setContentType(type: string) {
		this.contentType = type;
		return this;
	}
	public setResponseType(type: "json" | "text" | "blob") {
		this.responseType = type;
		return this;
	}

	/**
	 * Replaces path parameters in the URL.
	 * For example, if the URL is `/user/:id`, `params({ id: 42 })` will change it to `/user/42`.
	 * @param data An object where keys are the parameter names (without the colon) and values are the replacements.
	 */
	public params(data: any): this {
		for (let key in data) {
			let v = data[key];
			this.url = this.replaceUrlParams(this.url, key, v);
		}
		return this;
	}

	/**
	 * Appends query parameters to the URL.
	 * @param data An object representing the query parameters.
	 * @example queryParams({ page: 2, limit: 10 }) // appends "?page=2&limit=10"
	 */
	public queryParams(data: any): this {
		let query = [];
		for (let key in data) {
			query.push(key + "=" + data[key]);
		}
		this.url += "?" + query.join("&");
		return this;
	}

	/**
	 * Returns the final constructed URL string.
	 */
	public get(): string { return this.url; }
	/**
	 * Returns the final constructed URL string.
	 */
	public toString(): string { return this.url; }

}

/**
 * An abstract base class for API services.
 * It provides common functionality for making HTTP requests using `ApiService`
 * and a fluent `UrlBuilder` for creating request URLs.
 *
 * Services that extend `BaseApi` can easily make `get`, `post`, `put`, `del`, `upload`, and `download`
 * requests without dealing with the `HttpClient` directly.
 */
@Injectable()
export class BaseApi {

	protected ApiService: ApiService;
	protected Cache: CacheInterceptor;
	protected base: string = "";
	/**
	 * A default RxJS operator to map API responses.
	 * It assumes a standard response format `{ success: boolean, data: any, code: string }`.
	 * If `success` is true, it returns the `data` property; otherwise, it throws an error with the `code`.
	 */
	protected defaultMap: OperatorFunction<any, any> = map((rs: any) => {
		if (rs.success) return rs.data;
		else throw new Error(rs.code);
	});

	constructor(
		injector: Injector
	) {
		this.ApiService = injector.get(ApiService);
		this.Cache = injector.get(CacheInterceptor);
		this.base = injector.get(ConfigService).apiUrl;
	}

	/**
	 * Overrides the base URL for the API.
	 * @param url The new base URL.
	 */
	public setBase(url: string) {
		this.base = url;
	}

	/**
	 * Creates a `UrlBuilder` instance for a given endpoint.
	 * @param endpoint The API endpoint (e.g., '/users').
	 */
	public url(endpoint: string): RequestBuilder {
		let urlB = new RequestBuilder(this.base, endpoint);
		return urlB;
	}
	/**
	 * Creates a `UrlBuilder` instance from a full URL string, ignoring the service's base URL.
	 * @param url The full URL to use.
	 */
	public createUrl(url: string): RequestBuilder {
		return new RequestBuilder("", url);
	}
	/**
	 * Removes a specific URL from the request cache.
	 * @param url The `UrlBuilder` instance representing the URL to clear from the cache.
	 */
	protected clearCache(url: RequestBuilder): void {
		return this.Cache.unCache(url.get());
	}

	/**
	 * Performs a GET request.
	 * @param url The `UrlBuilder` instance for the request.
	 * @param cached If true, the request will be cached.
	 */
	protected get(url: RequestBuilder, cached: boolean|null = null): Observable<any> {
		let cache: boolean = cached ?? false;
		return this.ApiService
			.getApi(url, null, cache);
	}
	protected post(url: RequestBuilder, data: any): Observable<any> {
		return this.ApiService
			.postApi(url, data);	
	}
	/**
	 * Performs a PUT request.
	 * @param url The `UrlBuilder` instance for the request.
	 * @param data The payload to send.
	 */
	protected put(url: RequestBuilder, data: any): Observable<any> {
		return this.ApiService
			.putApi(url, data);
	}
	/**
	 * Performs a DELETE request.
	 * @param url The `UrlBuilder` instance for the request.
	 */
	protected del(url: RequestBuilder): Observable<any> {
		return this.ApiService
			.deleteApi(url);
	}
	/**
	 * Performs a file upload (multipart/form-data) request.
	 * @param url The `UrlBuilder` instance for the request.
	 * @param file The file to upload.
	 * @param payload Additional data to send with the file.
	 */
	protected upload(url: RequestBuilder, file: any[], payload: any): Observable<any> {
		return this.ApiService
			.uploadApi(url, file, payload);
	}
	/**
	 * Performs a request to download a file.
	 * @param url The `UrlBuilder` instance for the request.
	 */
	protected download(url: RequestBuilder): Observable<any> {
		return this.ApiService
			.fileApi(url);
	}



}