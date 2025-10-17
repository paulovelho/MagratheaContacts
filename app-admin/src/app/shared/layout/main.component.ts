import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { AppTopbar } from '../components/topbar/topbar.component';
import { LayoutService, MenuMode } from '@app/services/layout/layout.service';

const imports = [
	CommonModule,
	RouterOutlet,
	AppTopbar,
	SidebarComponent,
	ToastModule,
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

	constructor(
		private _location: Location,
		private cdr: ChangeDetectorRef,
		public layout: LayoutService,
	) {
	}

	ngOnInit() {
		this.menuMode = this.layout.menuMode;
		this.getCurrentPageName();
		this.layout.menuModeChange.subscribe((mode) => {
			this.menuMode = mode;
			this.cdr.markForCheck();
		});
	}

	public getCurrentPageName():void{       
		let url = this._location.path();
		let hash = (window.location.hash) ? '#' : '';    
	}

	public ngAfterViewInit(): void {
	}

}
