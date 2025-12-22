import { Injectable } from "@angular/core";
import { HttpResponse } from '@angular/common/http';

import { ErrorHandler } from '@services/error-handler/error-handler.service';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable()
export class ApiManager {

	constructor(
		private ErrorHandler: ErrorHandler,
		private Toaster: Toaster,
	) {}

	private ErrorCodeManager(code: number, data: any) {
		if(!code) code = data.code;
		return this.ErrorHandler.ErrorCodeManager(code, data);
	}

	public ErrorManager(err: any): void {
		const data = err.data ?? err;
		console.error("manager", data);
		switch (data.status) {
			case 0:
				this.ErrorCodeManager(0, err);
				break;
			case 401:
				console.log("error 401");
				let details = err.error;
				if(!details) this.Toaster.error("Chamada não autorizada!");
				else this.ErrorCodeManager(details.code, details.data)
				break;
			case 200:
				if(err.statusText == "OK") return;
				break;
			default:
				if(err.name == "TimeoutError") {
					this.Toaster.error("Timeout na consulta da API");
				}
				if(err.error && !err.error.success) {
					let error = err.error.data || err.error.error;
					if( error ) {
						let code = error.code || 0;
						this.ErrorCodeManager(code, error);
					} else {
						this.ErrorCodeManager(0, err.error);
					}
				}
				break;
		}
	}

	private ResponseManage(response: any): boolean {
		if(!response || response == undefined) return false;
		if(!response.success) {
			let data = response.data || {};
			if(typeof data != 'object') data = {};
			if(!data || !data.message) data.message = response.message;
			this.ErrorCodeManager(response.code, data);
			return false;
		}
		return true;
	}

	public StatusManage(event: HttpResponse<any>): boolean {
		switch (event.status) {
			case 200:
			default:
				let body: any = event.body;
				if(body instanceof Blob) return true;
				return this.ResponseManage(body);
				break;
			case 401:
				this.Toaster.error("Chamada não autorizada!");
				this.ErrorCodeManager(401, null);
				return false;
				break;
		}
	}

}
