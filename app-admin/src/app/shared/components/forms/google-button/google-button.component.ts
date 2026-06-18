import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-google-button',
	standalone: true,
	imports: [CommonModule, ButtonModule],
	templateUrl: './google-button.component.html',
	styles: `
		button {
			color: #000;
		}
		button:hover {
			color: #EA6D24!important;
		}
	`,
})
export class GoogleButtonComponent {
	@Input() label: string = 'Continuar com Google';
	@Output() googleClick = new EventEmitter<void>();

	onButtonClick() {
		this.googleClick.emit();
	}
}
