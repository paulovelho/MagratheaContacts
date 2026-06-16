import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpListComponent } from '../smtp-list/smtp-list.component';

@Component({
	selector: 'app-smtp-home',
	imports: [
		SharedModule,
		SmtpListComponent,
		AppWindowComponent,
	],
	templateUrl: './smtp-home.component.html',
	styleUrl: './smtp-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmtpHomeComponent {
	public loading:boolean = false;
	@ViewChild(SmtpListComponent) private listComponent!: SmtpListComponent;

	constructor() {}

}
