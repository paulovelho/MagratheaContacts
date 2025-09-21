import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { externalLinks } from '@app/services/navigation/external-links';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
		SharedModule,
	],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
	public showTopArrow: boolean = false;
	public links = externalLinks;
	public showPvLogo: boolean = false;
	public showRegister: boolean = false;
	public isDev: boolean = false;

	constructor(
		private toast: Toaster,
		public navigation: NavigationService,
		public settings: SettingsService,
	) { }

	ngOnInit(): void {
		this.settings.isOpen()
			.then(active => this.showRegister = active);
		this.settings.isDev().then(dev => this.isDev = dev);
		// this.settings.isDev().then(dev => this.showPvLogo = dev);
	}

	public turnOffDev(): void {
		this.settings.setDev(false);
		this.toast.warning("dev mode is off");
	}



}
