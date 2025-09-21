import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppState } from '@app/app.state';
import { ToastModule } from 'primeng/toast';

import { PreloaderComponent } from '../components/preloader/preloader.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

const imports = [
	CommonModule,
	RouterOutlet,
	ToastModule,

	NavbarComponent,
	FooterComponent,
];
const providers = [ AppState ];

@Component({
	selector: 'app-layout-main',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	imports, providers,
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
