import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { AppTopbar } from '../components/topbar/topbar.component';
import { LayoutService, MenuMode } from '@app/services/layout/layout.service';
import { DrawerModule } from 'primeng/drawer';
import { DrawerComponent } from '../components/sidebar/drawer.component';
import { ButtonComponent } from '../components/forms/button/button.component';
import { Store } from '@app/services/store/store.service';

const imports = [
	CommonModule,
	RouterOutlet,
	ButtonComponent,
	AppTopbar,
	DrawerComponent,
	SidebarComponent,
	ToastModule,
	DrawerModule,
];

@Component({
	selector: 'app-layout-main',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	imports,
})
export class MainComponent implements OnInit {
	public menuMode: MenuMode = "hide";
	public showDrawer: boolean = false;
	public userName: string = "...";

	constructor(
		private _location: Location,
		private cdr: ChangeDetectorRef,
		public layout: LayoutService,
		public store: Store,
	) {
	}

	ngOnInit() {
		this.menuMode = this.layout.menuMode;
		this.getCurrentPageName();
		this.layout.menuModeChange.subscribe((mode) => {
			this.menuMode = mode;
			this.cdr.detectChanges();
		});
		this.layout.showDrawerChange.subscribe((show) => {
			this.showDrawer = show;
			this.cdr.detectChanges();
		});
		this.store.getLoggedUser()
			.then(u => {
				this.userName = u?.name ?? "Marvin";
			});
	}

	public getCurrentPageName():void{       
		let url = this._location.path();
		let hash = (window.location.hash) ? '#' : '';    
	}

	public ngAfterViewInit(): void {
	}

}
