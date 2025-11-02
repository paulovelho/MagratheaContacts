import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

	private pagesUrl: string = "app";

	constructor(
		private router: Router
	) { }

	public Login(): void {
		this.router.navigate(['login']);
	}

	public appTo(destination: string[]): void {
		this.router.navigate([this.pagesUrl, ...destination]);
	}

	public goHome(): void {
		this.router.navigate([this.pagesUrl]);
	}

	goKeys = (): void => this.appTo(["keys"]);
	goSource = (): void => this.appTo(["sources"]);
	goSmtp = (): void => this.appTo(["smtp"]);
	goSmtpList = (): void => this.appTo(["smtp", "list"]);
	goSmtpNew = (): void => this.appTo(["smtp", "new"]);
	goLogs = (): void => this.appTo(["logs"]);
	goDev = (): void => this.appTo(["dev"]);
	goVersion = (): void => this.appTo(["version"]);

	public goAdminUsers(): void {
		this.appTo(["admin-users"]);
	}
	public goAdminUsersForm(id: any): void {
		this.appTo(["admin-users", id]);
	}

}
