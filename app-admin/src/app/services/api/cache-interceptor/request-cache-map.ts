import { Injectable } from "@angular/core";
import { RequestCache, RequestCacheEntry } from "./request-cache";
import { HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RequestCacheWithMap implements RequestCache {
  private cache = new Map<string, RequestCacheEntry>();
	private maxAge: number = 30000; // maximum cache age (ms)
	public calls: number = 0;

  constructor() { }

	public debug() { return this.cache; }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }
    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
		this.calls ++;
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    // console.info(`Caching response for "${url}".`);

    const newEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, newEntry);

    // remove expired cache entries
    const expired = Date.now() - this.maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }

	remove(url: string): void {
		this.cache.delete(url);
	}
}
