import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';
import { Message } from "primeng/api";

@Injectable()
export class ErrorHandler {

	constructor(
    private router: Router,
		private datePipe: DatePipe,
    private Store: Store,
		private Toaster: Toaster
	) {}

	public ErrorCodeManager(code: number, data: any): void {
		if(!code) code = data.code;
		console.error('error code ' + code, data);
		switch (code) {
			case 0:
				this.Toaster.error("API ERROR: " + data.message);
				break;
			case 1001:
				this.Toaster.error("invalid api parameters");
				break;
			case 400:
				this.Toaster.error("Dados inválidos");
				break;
			case 404:
				this.Toaster.error("Item não encontrado");
				break;
			case 4001:
			case 4002:
				this.Toaster.error("Não foi possível acessar a lista.");
				break;
			case 4004:
				this.Toaster.error("Dados não disponíveis para a busca.");
				break;
			case 4031:
				this.Toaster.error("As inscrições estão fechadas!");
				break;
			case 4032:
				const year = data["year"];
				const email = data["email"];
				this.Toaster.error("O e-mail "+email+" já está cadastrado para o ano de "+year);
				break;
			case 4041:
				this.Toaster.error("E-mail inválido: " + data);
				break;
			case 4043:
				// list not found - dealt on page
				break;
			case 500:
				this.Toaster.error(data.error);
				break;
			case 2005: // invalid object
				// take care of the error by itself
				break;
			default:
				console.error("unknown error!", data);
				const message = data.error ?? (data.msg ?? (data.message ?? "unknown error"));
				this.Toaster.error("error: " + message);
				break;
		}
	}

	public displayFormErrors(errors:any[]): void {
		errors.forEach(e => {
			this.getFormError(e.name, e.error);
		});
	}
	private getFormError(name: string, type: string) {
		switch (type) {
			case "required":
				this.Toaster.error(`${name} é obrigatório!`);
				break;
		}
	}
	public errorFromCall(error: any):boolean {
		console.error("errorFromCall", error);
		let msg = "ERRO na API: ";
		let errorMsg;

		if(error.data && error.data.msg) {
			errorMsg = error.data.msg;
		} else {
			if(error.code) {
				this.ErrorCodeManager(error.code, error);
				return false;
			}
			if(error.message) {
				errorMsg = error.message;
			}
		}
		this.Toaster.error(msg + errorMsg);
		return false;
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
		let messages: Message[] = [];
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
		switch (err.code) {
			case 5052:
				this.Toaster.error("Erro na integração financeira: " + err.message);
				break;
			default:
				const message = this.findErrorMessage(err);
				this.Toaster.error(message);
				break;
		}
	}

	public authenticationError(message: string): void {
		this.Toaster.error(message);
	}

}
