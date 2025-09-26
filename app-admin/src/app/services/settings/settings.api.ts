import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";

@Injectable()
export class SettingsApi extends BaseApi {
	constructor( injector: Injector ) { super(injector); }

	public getSettings(): Observable<any> {
		return this.get(this.url("/settings"), true);
	}

}
