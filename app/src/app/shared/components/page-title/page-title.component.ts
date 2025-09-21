import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
		SharedModule,
	],
	providers: [ NavigationService ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
	@Input() loading:boolean = false;
	@Input() title:string = "";
	@Input() subtitle:string = "";
	@Input() subpage?: string;
	@Output() subpageClick: EventEmitter<void> = new EventEmitter<void>();
	@Input() breadcrumb?: string;

	constructor(
		private nav: NavigationService,
	) { }

	public goHome() { this.nav.goHome() }
	public goSub() { this.subpageClick.emit(); }

}
