import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@services/layout/layout.service';
import { FontAwesomeSharedModule } from '@app/shared/font-awesome.module';
import { LogoComponent } from "../logo/logo.component";

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    FontAwesomeSharedModule,
    LogoComponent,
],
	styleUrl: 'topbar.component.scss',
	templateUrl: `topbar.component.html`,
})
export class AppTopbar {
	items!: MenuItem[];
	public darkIcon: string;

	constructor(public layoutService: LayoutService) {
		this.darkIcon = layoutService.isDarkTheme ? 'sun' : 'moon';
	}

	toggleDarkMode() {
		this.layoutService.toggleDarkMode();
	}
	toggleDrawer() {
		this.layoutService.drawerToggle();
	}
}
