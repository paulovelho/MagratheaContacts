import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

type adType = 'lojasalada'|'hilltop';
type adOdds = { type: string, odd: number };

@Injectable({
  providedIn: 'root'
})
export class AdsService {

	public processed: boolean = false;
	public ads:Array<adOdds> = [];

  constructor(
		private settings: SettingsService,
	) { }

	public async getAvailableAds(){
		if(!this.processed) {
			const strAds = await this.settings.getSetting("ads");
			strAds.forEach((adSetting: string) => {
				const ad = adSetting.split('-');
				this.ads.push({ type: ad[0], odd: ad[1] ? +ad[1] : 100 });
			});
			this.processed = true;
		}
		return this.ads;
	}

	public async getAd(): Promise<string|null> {
		if(!this.processed) await this.getAvailableAds();
		for(let i=0; i<this.ads.length; i++) {
			if(this.giveMeOdds(this.ads[i].odd)) return this.ads[i].type;
		}
		return null;		
	}

	public giveMeOdds(odds:number|null): boolean {
		if(odds == null) return true;
		let num = Math.random() * 100;
		return odds >= num;
	}

}
