import { Injectable } from '@angular/core';
import { SettingsApi } from './settings.api';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	private loaded: boolean = false;
	public basePoints: number = 120;
	private data?: any;
	//  "version", "year", "subscription_year", "active", "subscription_open"

	constructor(
		private api: SettingsApi,
	) { }

	public loadSettings() {
		return new Promise((resolve, reject) => {
			if(this.loaded && this.data) resolve(this.data);
			this.api.getSettings()
				.subscribe({
					next: (rs) => {
						this.data = rs.data;
						this.loaded = true;
						resolve(this.data);
					},
					error: reject,
				})
		});
	}
	public getSetting = 
		(key: string): Promise<any> => 
			this.loadSettings().then((rs: any) => rs[key]);

	public getCurrentYear = (): Promise<number> => this.getSetting("year");
	public getSubscriptionYear = (): Promise<number> => this.getSetting("subscription_year");

}
