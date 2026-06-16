import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";

@Injectable()
export class LogsApi extends BaseApi {
	constructor(
		injector: Injector
	) {
		super(injector);
	}

	public getLogs(page:number=0): Observable<any> {
		let url = this.url("/logs").queryParams({ page });
		return this.get(url).pipe(this.defaultMap);
	}

}
