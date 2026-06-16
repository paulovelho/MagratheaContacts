import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '@app/services/api/base.api';
import { iSmtp } from './smtp.interface';

@Injectable()
export class SmtpApi extends BaseApi {
	private baseUrl = '/smtp';
	private baseUrlPlural = this.baseUrl + 's';
	constructor( injector: Injector ) { super(injector); }

	public create(data: iSmtp): Observable<any> {
		return this.post(this.url(this.baseUrlPlural), data).pipe(this.defaultMap);
	}
	public list(): Observable<any> {
		return this.get(this.url(this.baseUrlPlural)).pipe(this.defaultMap);
	}
	public getOne(id:number): Observable<any> {
		return this.get(this.url(`${this.baseUrl}/:id`).params({id})).pipe(this.defaultMap);
	}
	public update(id:number, data: iSmtp): Observable<any> {
		return this.put(this.url(`${this.baseUrl}/:id`).params({id}), data).pipe(this.defaultMap);
	}
	public remove(id: number): Observable<any> {
		return this.del(this.url(`${this.baseUrl}/:id`).params({id})).pipe(this.defaultMap);
	}
}
