import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SharedModule } from '../shared.module';

@Component({
	selector: 'app-error-404',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [
		SharedModule,
		NavbarComponent,
		FooterComponent,
	],
	templateUrl: './error404.component.html',
	styleUrls: ['./error404.component.scss'],
})
export class Error404Component {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}
}
