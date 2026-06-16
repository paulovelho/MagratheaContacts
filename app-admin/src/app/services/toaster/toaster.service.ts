import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class Toaster {
  private destinationKey: string = 'app-toast';
  private sticky: boolean = false;

	constructor(
		private msgService: MessageService,
	) {
	}

	public getService(): MessageService { return this.msgService; }

	private debug(type: string, data: ToastMessageOptions): void {
		return;
		console.trace(type + " toaster with message", data);
	}

	public setDestination(key: string, stick: boolean = false): Toaster {
		this.destinationKey = key;
		this.sticky = stick;
		return this;
	}

	public createMessage(severity:string, summary:string, detail:string): ToastMessageOptions {
		return {
			key:this.destinationKey, 
			severity: severity, 
			summary: summary,
			detail: detail, 
			sticky: this.sticky
		};
	}

	public show(severity:string, summary:string, detail:string): ToastMessageOptions {
		const data = this.createMessage(severity, summary, detail);
		this.debug("toaster: ", data);
		this.msgService.add(data);
		return data;
	}

	public error(message: string): ToastMessageOptions {
		return this.show("error", "ERRO!", message);
	}
	public success(message: string, title: string = "Sucesso!"): ToastMessageOptions {
		return this.show("success", title, message);
	}
	public exception(err: any): ToastMessageOptions {
		return this.show("error", "Exception!", err);
	}
	public warning(message: string): ToastMessageOptions {
		return this.show("warn", "Atenção", message);
	}

	public clearToasts() {
		this.msgService.clear();
	}

}
