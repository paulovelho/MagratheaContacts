import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AuthService } from '@app/services/auth/authentication.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { menuBuilder, userMenuBuilder } from './menu';
import { MenuItem } from 'primeng/api';
import { AppState } from '@app/app.state';
import { LayoutService } from '@app/services/layout/layout.service';

import { LogoComponent } from '../logo/logo.component';

import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
// import { PanelMenuModule } from 'primeng/panelmenu';

const imports = [
	MenuModule,
	// PanelMenuModule,
	BadgeModule,
	SharedModule,
	LogoComponent,
];
const providers = [ NavigationService ];

@Component({
  selector: 'app-sidebar',
  standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
	imports, providers,
})
export class SidebarComponent implements OnInit {
	public loading: boolean = false;
	public showClose: boolean = true;
	public show: boolean = true;
	public menuItems: MenuItem[] = [];

	constructor(
		private auth: AuthService,
		private nav: NavigationService,
		private layout: LayoutService,
		private state: AppState,
	) {
	}

	ngOnInit() {
		this.buildMenu();
		if(this.layout.isMobile()) {
			this.show = false;
			this.showClose = true;
			console.info("subscribing navi");
			this.state.getEvent("navigation").subscribe((url:string) => {
				this.show = false
			});
		}
		this.layout.menuSubscribe().subscribe(() => this.show = true);
	}

	private buildMenu() {
		this.loading = true;
		Promise.all([
			menuBuilder(this.nav).then(menu => this.menuItems = menu ),
			userMenuBuilder(this.nav, this.auth),
		]).then(([mainMenu, userMenu]) => {
			this.menuItems = [...mainMenu, { separator: true }, ...userMenu];
			this.loading = false
		});
	}

}
