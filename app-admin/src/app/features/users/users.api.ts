import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";

@Injectable()
export class UsersApi extends BaseApi {
	constructor( injector: Injector ) { super(injector); }

	public getUser(id:number): Observable<any> {
		return this.get(this.url("/user/:id").params({id})).pipe(this.defaultMap);
	}
	public getLists(): Observable<any> {
		return this.get(this.url("/users")).pipe(this.defaultMap);
	}
	public getListsByYear(year:string|number): Observable<any> {
		return this.get(this.url("/users/:year").params({year})).pipe(this.defaultMap);
	}
	public generateRanking(): Observable<any> {
		return this.post(this.url("/ranking/generate"), null).pipe(this.defaultMap);
	}
	public getRanking(): Observable<any> {
		return this.get(this.url("/ranking/full")).pipe(this.defaultMap);
	}
	public deleteTestUser(id:number): Observable<any> {
		return this.del(this.url("/user/:id").params({id})).pipe(this.defaultMap);
	}

}
