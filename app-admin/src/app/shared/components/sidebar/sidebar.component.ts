import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/services/auth/authentication.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@app/services/store/store.service';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SharedModule } from '@app/shared/shared.module';
import { iStoreUser } from '@app/services/store/store.interface';
import { environment } from '@environments/environment';
import { menuBuilder, userMenuBuilder } from './menu';
import { LayoutService } from '@app/services/layout/layout.service';
import { AppState } from '@app/app.state';
import { Subscription } from 'rxjs';

const imports = [ PanelMenuModule, SharedModule, ];
const providers = [ NavigationService ];

@Component({
  selector: 'app-sidebar',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
	imports, providers,
})
export class SidebarComponent implements OnInit {
	public loading: boolean = false;
	public showClose: boolean = false;
	public show: boolean = true;
	public menuItems: MenuItem[] = [];
	public userMenu:  MenuItem[] = [];

	constructor(
		private auth: AuthService,
		private nav: NavigationService,
		private layout: LayoutService,
		private state: AppState,
	) { }

	ngOnInit() {
		this.buildUserMenu();
		if(this.layout.isMobile()) {
			this.show = false;
			this.showClose = true;
			console.info("subscribing navi");
			this.state.getEvent("navigation").subscribe((url:string) => {
				console.info("stsate change");
				this.show = false
			});
		}
		this.layout.menuSubscribe().subscribe(() => this.show = true);
	}

	private buildUserMenu() {
		this.loading = true;
		Promise.all([
			menuBuilder(this.nav).then(menu => this.menuItems = menu ),
			userMenuBuilder(this.nav, this.auth).then(menu => this.userMenu = menu),
		]).then(() => this.loading = false);
	}

}
