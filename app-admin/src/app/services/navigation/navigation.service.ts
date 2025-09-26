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

	public goSetupConfig(): void {
		this.appTo(["setup", "config"]);
	}
	public goSetupPublish(): void {
		this.appTo(["setup", "publish"]);
	}

	public searchBets(): void {
		this.appTo(["bets"]);
	}

	public deaths(): void {
		this.appTo(["deaths"]);
	}
	public deathNew(): void {
		this.appTo(["deaths", "new"]);
	}

	public goMedia(): void {
		this.appTo(["media", "images"]);
	}
	public goUpload(): void {
		this.appTo(["media", "upload"]);
	}
	public goDev(): void {
		this.appTo(["dev"]);
	}
	public goLogs(): void {
		this.appTo(["logs"]);
	}
	public goAdminUsers(): void {
		this.appTo(["admin-users"]);
	}
	public goAdminUsersForm(id: any): void {
		this.appTo(["admin-users", id]);
	}

	public lists(): void {
		this.appTo(["users"]);
	}
	public ranking = (): void => this.appTo(["users", "ranking"]);
	public rankingGenerate = (): void => this.appTo(["users", "generate-ranking"]);
	public retrospectivesList = (): void => this.appTo(["retrospectives"]);
	public retrospectiveView(year?:string): void {
		if(!year || year == undefined) this.appTo(["retrospectives", "new"]);
		else this.appTo(["retrospectives", "form", year ]);
	}

	public goAnalyticsData = ():void => this.appTo(["analytics"]);
	public goAnalyticsPeople = ():void => this.appTo(["analytics", "people"]);
	public goAnalyticsSettings = ():void => this.appTo(["analytics", "settings"]);
	public goAnalyticsPerson = (person_id: string): void => this.appTo(["analytics", "person", person_id]);
	public goAnayticsSearchHistory = (): void => this.appTo(["analytics", "search-history"]);

	public myAccount(): void {
		this.appTo(["my-account"]);
	}

	// public changePassword(): void {
	// 	this.router.navigate([this.pagesUrl, "my-account", "change-password"]);
	// }

	// public userList(): void {
	// 	this.router.navigate([this.pagesUrl, 'users']);
	// }
	// public userView(userId: string): void {
	// 	this.router.navigate([this.pagesUrl, 'users', 'view', userId]);
	// }
	// public userNew(): void {
	// 	this.router.navigate([this.pagesUrl, 'users', 'new']);
	// }

}
