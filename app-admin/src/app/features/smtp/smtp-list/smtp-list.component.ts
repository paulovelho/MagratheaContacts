import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { iSmtp } from '../smtp.interface';
import { SmtpService } from '../smtp.service';
import { SmtpApi } from '../smtp.api';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpItemComponent } from '../smtp-item/smtp-item.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SmtpFormComponent } from '../smtp-form/smtp-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { filter } from 'rxjs';

@Component({
	selector: 'app-smtp-list',
	imports: [
		SharedModule,
		SmtpItemComponent,
	],
	providers: [
		SmtpApi,
		SmtpService,
	],
	templateUrl: './smtp-list.component.html',
	styleUrls: ['./smtp-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmtpListComponent implements OnInit {
	public loading: boolean = true;
	public smtps: iSmtp[] = [];
	@Input() showSelectButton: boolean = false;
	@Output() selectSmtp = new EventEmitter<iSmtp>();

	constructor(
		private cdr: ChangeDetectorRef,
		private service: SmtpService,
		private dialog: DialogService,
		@Optional() private ref: DynamicDialogRef,
	) {
		if (this.ref) {
			this.showSelectButton = true;
		}
	}

	ngOnInit(): void {
		this.loadList();
	}

	public loadList(): void {
		this.loading = true;
		this.cdr.detectChanges();
		this.service.list().subscribe((data) => {
			this.smtps = data;
			this.loading = false;
			this.cdr.detectChanges();
		});
	}

	public newSmtp() {
		const ref = this.dialog.open(SmtpFormComponent, getDialogOptions("New SMTP", null, { width: `50%` }));
		ref.onClose
			.pipe(
				filter(result => !!result)
			)
			.subscribe(() => {
				this.loadList();
			});
	}

	public onEditSmtp(smtp: iSmtp) {
		const ref = this.dialog.open(SmtpFormComponent, getDialogOptions("Edit SMTP", smtp, { width: `50%` }));
		ref.onClose
			.pipe(
				filter(result => !!result)
			)
			.subscribe(() => {
				this.loadList();
			});
	}

	onSelectSmtp(smtp: iSmtp): void {
		if (this.ref) {
			this.ref.close(smtp);
		} else {
			this.selectSmtp.emit(smtp);
		}
	}
}
