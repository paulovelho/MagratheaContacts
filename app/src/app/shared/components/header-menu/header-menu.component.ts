import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { SharedModule } from '@app/shared/shared.module';
import { devMenu, menuBuilder } from './menu';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
	selector: 'app-header-menu',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		SharedModule,
		MenuItemComponent,
	],
	templateUrl: './header-menu.component.html',
	styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent implements OnInit {
	public menuItems: any[] = [];

	constructor(
		private settings: SettingsService,
		private nav: NavigationService,
	) { }

	ngOnInit(): void {
		this.buildMenu();
	}

	private async buildMenu(): Promise<void> {
		const isOpen:boolean = await this.settings.isOpen();
		const isDev:boolean = await this.settings.isDev();
		this.menuItems = menuBuilder(this.nav, isOpen);
		if(isDev) this.menuItems.push(devMenu(this.nav));
	}

}
