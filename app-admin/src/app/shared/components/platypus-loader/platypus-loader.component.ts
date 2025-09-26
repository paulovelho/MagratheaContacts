import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
	standalone: true,
  templateUrl: './platypus-loader.component.html',
  styleUrls: ['./platypus-loader.component.scss'],
	imports: [ CommonModule ]
})
export class PlatypusLoaderComponent {

	@Input() extraClass: string = "large";
	// extra class:
	// inline, small, white

  constructor() { }

}
