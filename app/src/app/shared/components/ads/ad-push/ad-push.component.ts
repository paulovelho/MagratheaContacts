
import { Component, ElementRef, Inject, OnInit, Renderer2, DOCUMENT } from '@angular/core';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
  selector: 'app-ad-push',
  standalone: true,
  imports: [],
  templateUrl: './ad-push.component.html',
  styleUrl: './ad-push.component.scss'
})
export class AdPushComponent implements OnInit {
	public show:boolean = false;

	constructor (
		private elementRef: ElementRef,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document,
		private settings: SettingsService,
	) { }

	ngOnInit(): void {
		// push ads deprecated: not using hilltop
//		this.Initialize();
	}

	private async Initialize() {
		const enabled:boolean = await this.isAdsEnabled();
		if(enabled) this.loadAds().then(() => this.show = true);
	}

	private isAdsEnabled(): Promise<boolean> {
		return this.settings.isAds();
	}

	public loadAds(): Promise<void> {
		return new Promise((resolve, reject) => {
			let script = this.renderer.createElement('script');
			script.src = "\/\/shortterm-garden.com\/btX.Vus\/d\/GSlU0\/YZWWcQ\/eeImZ9OuxZ\/UElJkdPAT\/Y\/y\/OQT\/YB1VNvz\/YFt-NDjQIp5KNOjSUk3vNjwU";
			script.async = true;
			script.referrerPolicy = 'no-referrer-when-downgrade';
			this.elementRef.nativeElement.appendChild(script);
			setTimeout(resolve, 1000);
		});
	}

}
