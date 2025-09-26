import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, from, throwError } from "rxjs";
import { catchError, map, timeout, switchMap, tap } from 'rxjs/operators';

import { ApiManager } from './api-manager.service';
import { Store } from '@services/store/store.service';
import { environment } from "@environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	private timeout = 20000 // in ms

	constructor(
		private Manager: ApiManager,
		private Store: Store
	){ }

	private async SetHeaders(req: HttpRequest<any>): Promise<HttpRequest<any>> {
		let token = await this.Store.getToken();
		if(token == null) {
			console.error('not logged');
			return req;
		}
		let r = req.clone({
			headers: req.headers
				.append('Authorization', 'Bearer ' + token)
		});
		return r;
	}

	private GetResponse(event: HttpEvent<any>): HttpEvent<any> {
		if(event instanceof HttpResponse) {
			const success = this.Manager.StatusManage(event);
			if(!success) {
				throw event.body;
			}
		}
		return event;
	}

	private manageError(error: any) {
		// console.info("caught error ", error);
		this.Manager.ErrorManager(error);
		return throwError(() => error || "Server.error");
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		const errorManager = catchError((err) => this.manageError(err));
		if(!this.isValidRequestForInterceptor(req)) return next.handle(req).pipe(errorManager);
		return from(this.SetHeaders(req))
			.pipe(
				switchMap(request => {
					return next.handle(request)
						.pipe( timeout(this.timeout) )
						.pipe( tap((ev: any) => this.GetResponse(ev)) )
						.pipe( errorManager );
				})
			);
	}

  private isValidRequestForInterceptor(req: HttpRequest<any>): boolean {
		let url: string = req.url;
		if(
			!url.startsWith(environment.api)
		) return false;
		return(!url.endsWith('/login'));
  }

}
