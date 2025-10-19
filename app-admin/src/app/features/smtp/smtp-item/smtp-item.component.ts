import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { iSmtp } from '../smtp.interface';
import { SharedModule } from '@app/shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { SmtpFormComponent } from '../smtp-form/smtp-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { SmtpListComponent } from '../smtp-list/smtp-list.component';
import { filter } from 'rxjs';

@Component({
	selector: 'app-smtp-item',
	standalone: true,
	imports: [
		SharedModule,
	],
	templateUrl: './smtp-item.component.html',
	styleUrls: ['./smtp-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmtpItemComponent {
	@Input({ required: true }) smtp!: iSmtp;

	private listComponent = inject(SmtpListComponent, { host: true });

	constructor(
		private dialog: DialogService,
	) { }

	onEdit(): void {
		const ref = this.dialog.open(SmtpFormComponent, getDialogOptions("Edit SMTP", this.smtp));
		ref.onClose
			.pipe(
				filter(result => !!result)
			)
			.subscribe(() => {
				this.listComponent.loadList();
			});
	}

}
