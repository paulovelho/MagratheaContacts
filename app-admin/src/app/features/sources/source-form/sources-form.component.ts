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
import { SmtpApi } from '@app/features/smtp/smtp.api';
import { SmtpService } from '@app/features/smtp/smtp.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { finalize } from 'rxjs';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
	selector: 'app-sources-form',
	templateUrl: './sources-form.component.html',
	styleUrls: ['./sources-form.component.scss'],
	imports: [
		SharedModule,
	],
	providers: [
		SourcesApi, SourcesService,
		SmtpApi, SmtpService,
		DialogService
	],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class SourcesFormComponent implements OnInit {
	public loading: boolean = false;
	public loadingSmtp: boolean = false;
	public form!: FormGroup;
	public isNew: boolean = true;
	public source: iSource|null = {
		name: '',
		mail_from: '',
	};
	public smtp?: iSmtp;

	constructor(
		private fs: FormService,
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private service: SourcesService,
		private smtpService: SmtpService,
		private dialog: DialogService,
		private toaster: Toaster,
		private errorService: ErrorHandler,
	) { }

	ngOnInit(): void {
		this.buildForm();
		const source: iSource = this.config.data;
		if (source) {
			this.setData(source);
		}
	}

	public buildForm() {
		this.form = this.fs.Build(["name", "mail_from", "smtp_id"], ["name"]);
	}

	private setData(source: iSource) {
		this.source = source;
		this.isNew = false;
		if(this.source.smtp_id) {
			this.loadingSmtp = true;
			this.smtpService.getOne(this.source.smtp_id).subscribe({
				next: smtp => {
					this.loadingSmtp = false;
					this.smtp = smtp;
				}
			});
		}
		this.form.patchValue(source);
	}

	public selectSmtp() {
		const ref = this.dialog.open(
			SmtpListComponent,
			getDialogOptions("Select SMTP", null, { width: `40%` })
		);
		ref.onClose.subscribe((smtp: iSmtp) => {
			if(smtp) {
				this.smtp = smtp;
				this.form.get('smtp_id')?.setValue(smtp['id']);
			}
		});
	}

	public clearSmtp() {
		this.smtp = undefined;
		this.form.get('smtp_id')?.setValue(null);
	}

	onSubmit(): void {
		const valid = this.fs.validate(this.form!);
		if(!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			return;
		}
		this.loading = true;
		const formData = this.form?.value;
		formData.smtp_id = this.smtp ? this.smtp['id'] : 0;
		const operation = this.source!["id"]
			? this.service.update(+this.source!["id"], formData)
			: this.service.create(formData);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`Source configuration ${this.isNew ? 'created' : 'updated'} successfully.`);
					this.closeDialog(true);
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	public closeDialog(result: boolean): void {
		this.loading = false;
		this.ref.close(result);
	}
}
