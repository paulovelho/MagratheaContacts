import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { timeout, delay } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ImagesConfig } from '@environments/images';

@Injectable()
export class ApiDelayerInterceptor implements HttpInterceptor {

	private on: boolean = environment.dev;
	private maxDelay:number = 2000;
	private minDelay:number = 500;

	constructor(
	){ }

	private DelayThis(url: string): boolean {
		return false;
		if(!this.on) return false;
		if(url.startsWith(environment.api)) return true;
		if(url.startsWith(ImagesConfig.api)) return true;
		return false;
	}

	private getDelayTime(): number {
		return Math.floor(Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		if(this.DelayThis(req.url)) {
			const delayFor = this.getDelayTime();
			console.info("delaying request for " + delayFor);
			return next.handle(request).pipe(delay(delayFor));
		}
		return next.handle(request);
	}
}
