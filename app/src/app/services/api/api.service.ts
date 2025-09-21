import { Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CACHE_REQUEST, CacheInterceptor } from "./cache-interceptor/cache.interceptor";


@Injectable()
export class ApiService {

	constructor(
		private http: HttpClient,
		private cache: CacheInterceptor,
	) {
	}

	private error = (error: any) => {
		return throwError(() => error || "Server.error");
	}

	private debug(url: string, method: string, data: any) {
		return;
		console.info("requesting [" + url + "](" + method + ") with options: ", data);
	}

	private ContentType(type: string): any {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': type,
			}),
		};
		return httpOptions;
	}

	public deleteCache(url: string): void {
		this.cache.unCache(url);
	}

	public getApi(url: string, params?: any, cache: boolean = false): Observable<any> {
		this.debug(url, "GET", params);
		let options = this.ContentType("application/json");
		options["params"] = params;
		options["context"] = new HttpContext().set(CACHE_REQUEST, cache);
		return this.http
			.get(url, options)
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public postApi(url: string, payload: any): Observable<any> {
		let options = this.ContentType("application/json");
		this.debug(url, "POST", payload);
		return this.http
			.post(url, payload, options)
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public putApi(url: string, payload: any): Observable<any> {
		this.debug(url, "PUT", payload);
		return this.http
			.put(url, payload, this.ContentType("application/json"))
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public deleteApi(url: string): Observable<any> {
		this.debug(url, "DELETE", null);
		return this.http
			.delete(url, this.ContentType("application/json"))
			.pipe(
				catchError((err) => this.error(err))
			);
	}

	public fileApi(url: string): Observable<any> {
		this.debug(url, "FILE", null);
		let options = this.ContentType("application/json");
		options["responseType"] = "blob";
		return this.http.get(url, options);
	}

	public uploadApi(url: string, file: any, payload:any=null): Observable<any> {
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
