import { Injectable } from '@angular/core';
import { SmtpApi } from './smtp.api';
import { iSmtp } from './smtp.interface';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmtpService {
	constructor(
		private api: SmtpApi,
	) {}

	private getSmtpFromData(data: any): iSmtp {
		return {
			id: data["id"],
			name: data["name"],
			description: data["description"],
			host: data["host"],
			port: data["port"],
			user: data["user"],
			// password: "...",
			password: data["password"],
			tls_encrypt: !!+data["tls_encrypt"],
		};
	}

	public list(): Observable<iSmtp[]> {
		return this.api.list()
			.pipe(
				map((rs: any) => {
					return rs.map((i: any) => this.getSmtpFromData(i));
				})
			);
	}

	public view(id: number): Observable<iSmtp> {
		return this.api.view(id)
			.pipe(map(rs => this.getSmtpFromData(rs)));
	}

	public create(data: iSmtp): Observable<any> {
		data["tls_encrypt"] = !!data["tls_encrypt"];
		return this.api.create(data);
	}

	public update(id: number, data: iSmtp): Observable<any> {
		data["tls_encrypt"] = !!data["tls_encrypt"];
		return this.api.update(id, data);
	}

	public remove(id:number): Observable<any> { return this.api.remove(id); }
}
