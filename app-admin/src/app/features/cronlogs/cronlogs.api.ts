import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";

@Injectable()
export class CronlogsApi extends BaseApi {
	constructor(
		injector: Injector
	) {
		super(injector);
	}

	// raw response is needed here (not defaultMap) to keep the page/has_more envelope
	public getLogs(page: number = 0): Observable<any> {
		const url = this.url("/cronlogs").queryParams({ page });
		return this.get(url);
	}

	public deleteOlderThan(before: string): Observable<any> {
		const url = this.url("/cronlogs").queryParams({ before });
		return this.del(url).pipe(this.defaultMap);
	}

}
