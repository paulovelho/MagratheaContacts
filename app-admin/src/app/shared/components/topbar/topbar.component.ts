import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@services/layout/layout.service';
import { FontAwesomeSharedModule } from '@app/shared/font-awesome.module';
import { LogoComponent } from "../logo/logo.component";
import { Store } from '@app/services/store/store.service';
import { AppState } from '@app/app.state';

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
export class AppTopbar implements OnInit {
	items!: MenuItem[];
	public darkIcon: string;
	public source: string = "-";
	
	constructor(
		public layoutService: LayoutService,
		private store: Store,
		private state: AppState,
	) {
		this.darkIcon = layoutService.isDarkTheme ? 'sun' : 'moon';
	}

	ngOnInit(): void {
		this.getSource();
		this.state.subscribe("source", () => this.getSource());
	}
	
	private getSource() {
		this.store.getSource().then(s => { this.source = s?.name ?? '-' });
	}

	toggleDarkMode() {
		this.layoutService.toggleDarkMode();
	}
	toggleDrawer() {
		this.layoutService.drawerToggle();
	}
}
