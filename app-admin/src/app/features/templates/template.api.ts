import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '@app/services/api/base.api';

@Injectable()
export class TemplatesApi extends BaseApi {
	private baseUrl = '/template';
	private baseUrlPlural = this.baseUrl + 's';
	constructor( injector: Injector ) { super(injector); }

	public create(data: any): Observable<any> {
		return this.post(this.url(this.baseUrlPlural), data).pipe(this.defaultMap);
	}
	public list(): Observable<any> {
		return this.get(this.url(this.baseUrlPlural)).pipe(this.defaultMap);
	}
	public getOne(id: number): Observable<any> {
		return this.get(this.url(`${this.baseUrl}/:id`).params({id})).pipe(this.defaultMap);
	}
	public update(id: number, data: any): Observable<any> {
		return this.put(this.url(`${this.baseUrl}/:id`).params({id}), data).pipe(this.defaultMap);
	}
	public remove(id: number): Observable<any> {
		return this.del(this.url(`${this.baseUrl}/:id`).params({id})).pipe(this.defaultMap);
	}
	public preview(data: any): Observable<any> {
		return this.post(this.url(`${this.baseUrl}/preview`), data).pipe(this.defaultMap);
	}
	public getBySource(sourceId: number): Observable<any> {
		return this.get(this.url("/source/:source/templates").params({ source: sourceId })).pipe(this.defaultMap);
	}
	public getPromisesBySource(sourceId: number): Observable<any> {
		return this.get(this.url("/source/:source/promises").params({ source: sourceId })).pipe(this.defaultMap);
	}
	public getPromisesByTemplate(templateId: number): Observable<any> {
		return this.get(this.url(`${this.baseUrl}/:template/promises`).params({ template: templateId })).pipe(this.defaultMap);
	}
	public createPromise(data: any): Observable<any> {
		return this.post(this.url("/add"), data).pipe(this.defaultMap);
	}
	public getPromise(id: number): Observable<any> {
		return this.get(this.url("/promise/:id").params({ id })).pipe(this.defaultMap);
	}
	public processPromise(id: number): Observable<any> {
		return this.post(this.url("/promise/:id/process").params({ id }), null).pipe(this.defaultMap);
	}
}
