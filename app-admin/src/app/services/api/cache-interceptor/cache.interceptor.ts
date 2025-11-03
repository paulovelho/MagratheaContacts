// #docplaster
import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpContextToken } from '@angular/common/http';

import { Observable, of, startWith, tap } from 'rxjs';
import { RequestCache } from './request-cache';

export const CACHE_REQUEST = new HttpContextToken<boolean>(() => false);

/**
 * If request is cacheable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cacheable,
 * pass request through to next()
 */
// #docregion v1
@Injectable({
	providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
	private cache: RequestCache;
	constructor() {
		this.cache = inject(RequestCache);
	}
	
	debugCache(): any { return this.cache.debug(); }
	unCache(url: string): void {
		return this.cache.remove(url);
	}
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// continue if not cacheable.
		if (!this.isCacheable(req)) { return next.handle(req); }

		const cachedResponse = this.cache.get(req);
		if(cachedResponse) console.info("getting cached response ", cachedResponse);

		// #enddocregion v1
		// #docregion intercept-refresh
		// cache-then-refresh
		if (req.headers.get('x-refresh')) {
			const results$ = this.sendRequest(req, next, this.cache);
			return cachedResponse ?
				results$.pipe(startWith(cachedResponse)) :
				results$;
		}

		// cache-or-fetch
		// #docregion v1
		return cachedResponse ?
			of(cachedResponse) : this.sendRequest(req, next, this.cache);
		// #enddocregion intercept-refresh
	}

	/** Is this request cacheable? */
	isCacheable(req: HttpRequest<any>): boolean {
		// Only GET requests are cacheable
		if (req.method !== 'GET') return false;
		return req.context.get(CACHE_REQUEST);
	}

	/**
	 * Get server response observable by sending request to `next()`.
	 * Will add the response to the cache on the way out.
	 */
	sendRequest(
		req: HttpRequest<any>,
		next: HttpHandler,
		cache: RequestCache): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(event => {
				// There may be other events besides the response.
				if (event instanceof HttpResponse) {
					cache.put(req, event); // Update the cache.
				}
			})
		);
	}

}

