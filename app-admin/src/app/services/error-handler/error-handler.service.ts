import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';
import { ToastMessageOptions } from "primeng/api";

@Injectable()
export class ErrorHandler {

	constructor(
    private router: Router,
		private datePipe: DatePipe,
    private Store: Store,
		private Toaster: Toaster
	) {}

	public ErrorCodeManager(code: number, data: any): void {
		console.error('error code ' + code, data);
		switch (code) {
			case 0:
				this.Toaster.error("API ERROR: " + data.message);
				break;
			case 1001:
				this.Toaster.error("invalid api parameters");
				break;
			case 401:
				this.redirectToLogin();
				break;
			case 4010: // token expired
				console.error(data);
				let expired = this.datePipe.transform(data.expiredAt, 'yyyy-MM-dd hh:mm:ss');
				this.Toaster.warning("Expired login - @ " + expired);
				this.redirectToLogin();
				break;
			case 4011:
				this.Toaster.error("user/password incorrect");
				break;
			case 500:
				this.Toaster.error(data.error);
				break;
			case 2005: // invalid object
				// take care of the error by itself
				break;
			default:
				this.Toaster.error("uncaught error: " + this.findErrorMessage(data));
				break;
		}
	}

	private getErrorMessage(item: any): string {
		switch (item.error) {
			case "uniqueEmail":
				return item.key + " já está cadastrado no sistema!";
			case "required":
				return item.key + " é obrigatório!";
			default:
				return item.key + " behave unexpectedly";
		}
	}

	private findErrorMessage(body:any): string {
		if(body.msg) return body.msg;
		if(body.message) return body.message;
		if(body.error) {
			if(body.error?.data) return body.error.data;
			if(body.error?.err) return body.error.err;
			return body.error.toString();
		}
		if(body.data) {
			const data = body.data;
			if(typeof data === 'string') return data;
			if(data.error) return data.error;
			if(data.msg) return data.msg;
		}
		return "unknown error reported by server";
	}

	private redirectToLogin(): void {
		this.Store.clean();
		this.router.navigate(["login"]);
	}

	public ValidationError(errors: Array<any>) {
		if(!errors) return this.unknownError(errors);
		let messages: ToastMessageOptions[] = [];
		console.error(errors);
		errors.forEach((item) => {
			this.Toaster.warning(this.getErrorMessage(item));
		});
		return messages;
	}

	private unknownError(item: any): void {
		console.error(item);
		this.Toaster.error("Ocorreu um erro desconhecido!");
	}

	public exception(err: any): void {
		return this.ErrorCodeManager(err.code, err);
	}

}
