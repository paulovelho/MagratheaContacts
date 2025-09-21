
import { Component, ElementRef, Inject, OnInit, Renderer2, DOCUMENT } from '@angular/core';
import { SettingsService } from '@app/services/settings/settings.service';
import { concatAll } from 'rxjs';

@Component({
  selector: 'app-ad-block1',
  standalone: true,
  imports: [],
  templateUrl: './ad-block1.component.html',
  styleUrl: './ad-block1.component.scss'
})
export class AdBlock1Component implements OnInit {
	public show:boolean = false;

	constructor (
		private elementRef: ElementRef,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document,
		private settings: SettingsService,
	) { }

	ngOnInit(): void {
		this.Initialize();
	}

	private async Initialize() {
		const enabled:boolean = await this.isAdsEnabled();
		if(enabled) this.loadAds().then(() => this.show = true);
	}

	private isAdsEnabled(): Promise<boolean> {
		return this.settings.isAds();
	}

	public createContainers() {
		let container = this.renderer.createElement('div');
		this.renderer.addClass(container, 'ad-container');
		let ad = this.renderer.createElement('div');
		this.renderer.addClass(ad, 'ad');
		container.appendChild(ad);
		this.elementRef.nativeElement.appendChild(container);
		return ad;
	}

	public loadAds(): Promise<void> {
		return new Promise((resolve, reject) => {
			let script = this.renderer.createElement('script');
			script.src = "\/\/shortterm-garden.com\/bRX\/V.spdHGOln0VYoWZcu\/Me\/m\/9AurZlU\/l\/kTP\/TuUZ4WMNzHINxoOXDkUettN\/TGgBz\/MVjnE\/4ON\/gS";
			script.async = true;
			script.referrerPolicy = 'no-referrer-when-downgrade';
			let container = this.createContainers();
			container.appendChild(script);
			setTimeout(resolve, 1000);
		});
	}

}
