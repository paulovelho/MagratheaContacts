import { Component, Input } from '@angular/core';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { ButtonComponent } from "../forms/button/button.component";

@Component({
	selector: 'app-error-box',
	standalone: true,
	imports: [
    ButtonComponent
	],
	providers: [
		NavigationService,
	],
	templateUrl: './error-box.component.html',
	styleUrl: './error-box.component.scss'
})
export class ErrorBoxComponent {
	@Input() errorMsg: string = "Ocorreu um erro no site!\nPerdão pelo vacilo.";

	constructor(
		public nav: NavigationService,
	) {}
}
