import { Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CACHE_REQUEST, CacheInterceptor } from "./cache-interceptor/cache.interceptor";
import { RequestBuilder } from "./base.api";


@Injectable()
export class ApiService {

	public contentType: string = "application/json";
	constructor(
		private http: HttpClient,
		private cache: CacheInterceptor,
	) {
	}

	private error = (error: any) => {
		return throwError(() => error || "Server.error");
	}

	private debug(url: string, method: string, data: any) {
		console.info("requesting [" + url + "](" + method + ") with options: ", data);
	}

	private ContentType(request?: RequestBuilder): any {
		let type = request?.contentType || this.contentType;
		let responseType = request?.responseType || "json";
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': type,
			}),
			responseType: responseType,
		};
		return httpOptions;
	}

	public deleteCache(url: string): void {
		this.cache.unCache(url);
	}

	public getApi(request: RequestBuilder, params?: any, cache: boolean = false, responseType: 'json' | 'text' | 'blob' = 'json'): Observable<any> {
		const url = request.get();
		this.debug(url, "GET", params);
		let options = this.ContentType(request);
		options["params"] = params;
		options["context"] = new HttpContext().set(CACHE_REQUEST, cache);
		return this.http
			.get(url, options)
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public postApi(request: RequestBuilder, payload: any, responseType: 'json' | 'text' | 'blob' = 'json'): Observable<any> {
		const url = request.get();
		let options = this.ContentType(request);
		this.debug(url, "POST", payload);
		return this.http
			.post(url, payload, options)
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public putApi(request: RequestBuilder, payload: any): Observable<any> {
		const url = request.get();
		this.debug(url, "PUT", payload);
		return this.http
			.put(url, payload, this.ContentType(request))
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public deleteApi(request: RequestBuilder): Observable<any> {
		const url = request.get();
		this.debug(url, "DELETE", null);
		return this.http
			.delete(url, this.ContentType(request))
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public fileApi(request: RequestBuilder): Observable<any> {
		const url = request.get();
		this.debug(url, "FILE", null);
		let options = this.ContentType(request);
		options["responseType"] = "blob";
		return this.http.get(url, options);
	}

	public uploadApi(request: RequestBuilder, file: any, payload:any=null): Observable<any> {
		const url = request.get();
		let fd = new FormData();
		fd.append("file", file, file.name);
		if(payload) {
			Object.keys(payload).forEach(
				(key:string) => {
					let value = payload[key];
					fd.append(key, value);
				}
			);
		}
		// let options = this.ContentType("multipart/form-data");
		return this.http.post(url, fd);
	}
}
