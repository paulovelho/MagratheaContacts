import { Component, OnInit } from '@angular/core';
import { AdsService } from '@app/services/ads/ads.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { AdsModule } from '@app/shared/ads.module';
import { SharedModule } from '@app/shared/shared.module';
import { Block350300Component } from "../../../shared/components/ads/block-350-300/block-350-300.component";

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [
    SharedModule,
    AdsModule,
    Block350300Component
],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {

	public marketing_on: boolean = false;
	public ads_on: boolean = false;
	public ads: string | null = null;

	public currentAd: string | null = null;
	public adStory: any = [];	
	public runs: number = 0;
	constructor(
		private settings: SettingsService,
		private adsService: AdsService,
	) { }

	ngOnInit(): void {
		this.getSettings();
		this.getAd();
	}

	public async getSettings() {
		this.marketing_on = await this.settings.getSetting("marketing_on");
		this.ads_on = await this.settings.getSetting("ads_on");
		this.ads = await this.settings.getSetting("ads");
	}

	public getAd() {
		this.adsService.getAd()
			.then(ad => {
				if(ad == null) ad = "<none>";
				this.currentAd = ad;
				this.runs++;
				if(this.adStory[ad]) this.adStory[ad]++;
				else this.adStory[ad] = 1;
			});
	}


}
