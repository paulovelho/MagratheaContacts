import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html'
})
export class ErrorComponent {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}
}