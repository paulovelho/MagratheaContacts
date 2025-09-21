import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [ CommonModule, ],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss'
})
export class AppCardComponent {

	@Input() feel: string = "";
	// primary, success, info, warning, danger
	@Input() showFooter: boolean = false;

}
