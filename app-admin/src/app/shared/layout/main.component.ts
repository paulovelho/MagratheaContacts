import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';

const imports = [
	CommonModule,
	RouterOutlet,
	NavbarComponent,
	SidebarComponent,
	ToastModule,
];

@Component({
	selector: 'app-layout-main',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	imports,
})
export class MainComponent implements OnInit {

	constructor(

		private _location: Location
	) {
	}

	ngOnInit() {
		this.getCurrentPageName();
	}

	public getCurrentPageName():void{       
		let url = this._location.path();
		let hash = (window.location.hash) ? '#' : '';    
	}

	public ngAfterViewInit(): void {
	}

}
