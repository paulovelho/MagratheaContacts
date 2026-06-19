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

	public appTo(destination: string[]): Promise<boolean> {
		return this.router.navigate([this.pagesUrl, ...destination]);
	}

	public goHome(): void {
		this.router.navigate([this.pagesUrl]);
	}

	goEmails = (): Promise<boolean> => this.appTo(["emails"]);
	goEmailTest = (): Promise<boolean> => this.appTo(["emails", "test"]);
	goEmailProcess = (): Promise<boolean> => this.appTo(["emails", "process"]);
	goKeys = (): Promise<boolean> => this.appTo(["keys"]);
	goSource = (): Promise<boolean> => this.appTo(["sources"]);
	goSmtp = (): Promise<boolean> => this.appTo(["smtp"]);
	goSmtpList = (): Promise<boolean> => this.appTo(["smtp", "list"]);
	goSmtpNew = (): Promise<boolean> => this.appTo(["smtp", "new"]);
	goLogs = (): Promise<boolean> => this.appTo(["logs"]);
	goDev = (): Promise<boolean> => this.appTo(["dev"]);
	goVersion = (): Promise<boolean> => this.appTo(["version"]);
	goInfo = (): Promise<boolean> => this.appTo(["info"]);

	public goAdminUsers(): void {
		this.appTo(["admin-users"]);
	}
	public goAdminUsersForm(id: any): void {
		this.appTo(["admin-users", id]);
	}

}
