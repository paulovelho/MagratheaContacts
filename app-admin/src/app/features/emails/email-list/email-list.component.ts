import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iEmail } from '../email.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { EmailViewComponent } from '../email-view/email-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { BaseComponent } from 'primeng/basecomponent';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { getDialogOptions } from '@app/shared/layout/dialog-options';

@Component({
	selector: 'app-email-list',
	imports: [
		SharedModule,
		TableModule,
		ButtonModule,
	],
	templateUrl: './email-list.component.html',
	styleUrl: './email-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent extends BaseComponent {
	@Input() list: iEmail[] = [];

	constructor(private dialogService: DialogService) {
		super();
	}

	openEmail(email: iEmail) {
		this.dialogService.open(
			EmailViewComponent,
			getDialogOptions("E-mail details", email),
		);
	}
}
