import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { NavigationService } from "@app/services/navigation/navigation.service";
import { LayoutService } from "@app/services/layout/layout.service";
import { AppState } from "@app/app.state";

import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from "primeng/api";
import { AuthService } from "@app/services/auth/authentication.service";
import { MenuService } from "./menu.service";
// import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
	selector: 'app-menu',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		SharedModule,
		MenuModule,
		// PanelMenuModule,
		BadgeModule,
	],
	styleUrl: 'sidebar.component.scss',
	templateUrl: 'menu.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {
	@Input() type: "default" | "right" = "default";
	public loading: boolean = false;
	public onlyIcons: boolean = false;
	public menuItems: MenuItem[] = [];

	constructor(
		public cdr: ChangeDetectorRef,
		private nav: NavigationService,
		private auth: AuthService,
		private layout: LayoutService,
	) { }

	ngOnInit() {
		this.buildMenu();
		this.viewMode();
		this.layout.menuModeChange.subscribe((mode) => this.viewMode());
	}

	private viewMode() {
		this.onlyIcons = (this.layout.menuMode == "icons");
		this.cdr.markForCheck();
	}

	private buildMenu() {
		this.loading = true;
		const items = this.type == "right" ?
			this.buildRightMenu() :
			this.buildDefaultMenu();
		Promise.all(items).then(([mainMenu, userMenu]) => {
			this.menuItems = [...mainMenu, { separator: true }, ...userMenu];
			this.loading = false
		});
	}

	private buildDefaultMenu(): any[] {
		return [
			MenuService.menuBuilder(this.nav).then(menu => this.menuItems = menu ),
		];
	}

	private buildRightMenu(): any[] {
		return [
			MenuService.rightMenuBuider(this.nav).then(menu => this.menuItems = menu ),
			MenuService.userMenuBuilder(this.nav, this.auth),
		];
	}

}

