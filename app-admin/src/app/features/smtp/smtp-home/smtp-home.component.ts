import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpListComponent } from '../smtp-list/smtp-list.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SmtpFormComponent } from '../smtp-form/smtp-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { filter } from 'rxjs';

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

	constructor(
		private dialog: DialogService,
	) {}

	public newSmtp() {
		const ref = this.dialog.open(SmtpFormComponent, getDialogOptions("New SMTP"));
		ref.onClose
			.pipe(
				filter(result => !!result)
			)
			.subscribe(() => {
				this.listComponent.loadList();
			});
	}

}
