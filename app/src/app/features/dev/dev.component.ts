import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { version } from '@app/version';
import { SettingsService } from '@app/services/settings/settings.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { NavigationService } from '@app/services/navigation/navigation.service';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [
		CommonModule,
		RouterOutlet,
		SharedModule,
	],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.scss'
})
export class DevComponent implements OnInit {
	public version: string = "???";
	public showImage: boolean = true;

	constructor(
		private router: Router,
		private settings: SettingsService,
		private toast: Toaster,
		private nav: NavigationService,
	) {
		this.version = version.v;
	}

	ngOnInit(): void {
		this.settings.isDev().then(rs => {
			if(!rs) {
				this.toast.error("dev mode is off!");
				this.nav.goHome();
			}
		});
	}

	private navigate(to: string): void {
		// this.router.navigate([{
		// 	outlets: { dev: ["dev", to] }
		// }]);
		this.router.navigate(["dev", to]);
	}

	build = () => this.navigate("build");
	store = () => this.navigate("store");
	token = () => this.navigate("token");
	cache = () => this.navigate("cache");
	ads = () => this.navigate("ads");
	medias = () => this.navigate("medias");
	godMode = () => this.navigate("god-mode");
	api = () => this.navigate("api");

}
