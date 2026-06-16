// #docplaster
import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpContextToken, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

export const CACHE_REQUEST = new HttpContextToken<boolean>(() => false);
@Injectable({
	providedIn: 'root',
})
export class AvoidCacheInterceptor implements HttpInterceptor {
	constructor() { }

	private SetHeaders(req: HttpRequest<any>): HttpRequest<any> {
		const httpRequest = req.clone({
			headers: req.headers
				.append('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
				.append('Pragma', 'no-cache')
				.append('Expires', '0')
		});
		return httpRequest;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// if is cached reqeust, skip
		if(req.context.get(CACHE_REQUEST)) { return next.handle(req); }
		return next.handle(this.SetHeaders(req));
	}

}

