import { Component, ViewEncapsulation } from '@angular/core';

import { version } from '@app/version';
import { SharedModule } from '@app/shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';

import { BuildComponent } from '../build/build.component';
import { StoreComponent } from '../store/store.component';
import { TokenComponent } from '../token/token.component';
import { CacheComponent } from '../cache/cache.component';
import { MediasApiComponent } from '../medias-api/medias-api.component';
import { ApiComponent } from '../api/api.component';

@Component({
  selector: 'app-dev-menu',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [ SharedModule ],
	providers: [ DialogService ],
  templateUrl: './dev-menu.component.html',
  styleUrl: './dev-menu.component.scss'
})
export class DevMenuComponent {
	public version:string = "???";

	constructor(
		private dialog: DialogService,
	) {
		this.version = version.v;
	}

	public openComponent(component: any, width:string = "650px"): void {
		this.dialog.open(component, {
			modal: true,
			draggable: false,
			resizable: true,
			maximizable: true,
			closeOnEscape: true,
			width,
			// height: "100%",
		});
	}

	build = () => this.openComponent(BuildComponent);
	store = () => this.openComponent(StoreComponent, "100%");
	token = () => this.openComponent(TokenComponent);
	cache = () => this.openComponent(CacheComponent);
	medias = () => this.openComponent(MediasApiComponent);
	api = () => this.openComponent(ApiComponent);

}
