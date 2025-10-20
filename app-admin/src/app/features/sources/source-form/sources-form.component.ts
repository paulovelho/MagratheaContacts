import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SourcesService } from '../sources.service';
import { iSource } from '../source.interface';
import { SharedModule } from '@app/shared/shared.module';
import { FormService } from '@app/services/form/form.service';
import { SourcesApi } from '../source.api';
import { iSmtp } from '@app/features/smtp/smtp.interface';
import { SmtpListComponent } from '@app/features/smtp/smtp-list/smtp-list.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';

@Component({
	selector: 'app-sources-form',
	templateUrl: './sources-form.component.html',
	styleUrls: ['./sources-form.component.scss'],
	imports: [
		SharedModule,
	],
	providers: [ SourcesApi, SourcesService, DialogService ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesFormComponent implements OnInit {
	public form!: FormGroup;
	public smtp?: iSmtp;

	constructor(
		private fs: FormService,
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private service: SourcesService,
		private dialog: DialogService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		const source: iSource = this.config.data || {};
		this.buildForm();
	}

	public buildForm() {
		this.form = this.fs.Build(["name", "mail_from", "smtp_id"], ["name"]);
	}

	public selectSmtp() {
		const ref = this.dialog.open(
			SmtpListComponent,
			getDialogOptions("Select SMTP", null, { width: `40%` })
		);
		ref.onClose.subscribe((smtp: iSmtp) => {
			console.info("selected", smtp);
			if(smtp) {
				this.smtp = smtp;
				this.form.get('smtp_id')?.setValue(smtp['id']);
				this.cdr.markForCheck();
			}
		});
	}

	public clearSmtp() {
		this.smtp = undefined;
		this.form.get('smtp_id')?.setValue(null);
	}

	onSubmit(): void {
		if (this.form.valid) {
			if(this.smtp) this.form.value.smtp_id = this.smtp['id'];
			const source: iSource = this.form.value;
			const request = this.config.data
				? this.service.update(this.config.data.id, source)
				: this.service.create(source);

			request.subscribe(() => this.ref.close(true));
		}
	}

	onCancel(): void {
		this.ref.close(false);
	}
}