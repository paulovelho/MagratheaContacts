import { Injectable } from '@angular/core';
import { SettingsApi } from './settings.api';
import { Observable } from 'rxjs';
import { Store } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	private loaded: boolean = false;
	private dev: boolean = false;
	private data?: any;
	public basePoints: number = 120;
	//  "version", "year", "subscription_year", "active", "subscription_open"

	constructor(
		private store: Store,
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
				});
		});
	}
	public getSetting = 
		(key: string): Promise<any> => 
			this.loadSettings().then((rs: any) => rs[key]);

	public getCurrentYear = (): Promise<number> => this.getSetting("year");
	public getSubscriptionYear = (): Promise<number> => this.getSetting("subscription_year");

	public async isActive(): Promise<boolean> {
		let active = await this.getSetting("active");
		return !!active;
	}
	public async isOpen(): Promise<boolean> {
		let active = await this.getSetting("subscription_open");
		return !!active;
	}
	public async isAds(): Promise<boolean> {
		let active = await this.getSetting("ads");
		return !!active;
	}

	public loadVersion(): Observable<any> {
		return this.api.getVersion();
	}
	public async isDev(): Promise<boolean> {
		return this.store.getBool("dev");
	}
	public setDev(dev:boolean) {
		this.store.set("dev", dev);
		this.dev = dev;
	}

}
