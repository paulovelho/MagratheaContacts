import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { iSmtp } from '../smtp.interface';
import { SmtpService } from '../smtp.service';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpApi } from '../smtp.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { FormService } from '@app/services/form/form.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
	selector: 'app-smtp-form',
	imports: [
		SharedModule,
		ReactiveFormsModule,
		ConfirmPopupModule,
	],
	standalone: true,
	providers: [
		SmtpApi,
		SmtpService,
		Toaster,
		FormService,
		ConfirmationService,
	],
	templateUrl: './smtp-form.component.html',
	styleUrl: 'smtp-form.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class SmtpFormComponent implements OnInit {
	public loading: boolean = false;
	public smtp: iSmtp = {
		name: '',
		description: '',
		host: '',
		port: '587',
		user: '',
		password: '',
		tls_encrypt: true,
	};
	public isNew: boolean = true;
	public form?: FormGroup;

	constructor(
		private service: SmtpService,
		private route: ActivatedRoute,
		private fs: FormService,
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private errorService: ErrorHandler,
		private toaster: Toaster,
		private confirmationService: ConfirmationService,
	) { }

	ngOnInit(): void {
		const data = this.config.data;
		this.buildForm();
		if(data) this.setData(data);
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadSmtp(id);
	}

	private buildForm() {
		const fields = ["description", "host", "port", "user", "password", "tls_encrypt"];
		const mandatory = ["description", "host", "port", "user", "password"];
		this.form = this.fs.Build(fields, mandatory);
	}
	private setData(data: iSmtp) {
		this.isNew = false;
		this.smtp = data;
		this.form?.patchValue(this.smtp);
	}

	private loadSmtp(id: string) {
		this.loading = true;
		this.service.getOne(+id)
			.pipe(finalize(() => this.loading = false))
			.subscribe(data => {
				this.loading = false;
				this.setData(data);
			});
	}

	onSubmit(): void {
		const valid = this.fs.validate(this.form!);
		if(!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			return;
		}
		this.loading = true;
		const formData = this.form?.value;
		const operation = this.smtp["id"]
			? this.service.update(+this.smtp["id"], formData)
			: this.service.create(formData);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`SMTP configuration ${this.isNew ? 'created' : 'updated'} successfully.`);
					this.closeDialog(true);
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	onDelete(event: Event): void {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Are you sure that you want to delete this SMTP configuration?',
			accept: () => {
				this.loading = true;
				this.service.remove(+this.smtp['id']!)
					.pipe(finalize(() => this.loading = false))
					.subscribe({
						next: () => {
							this.toaster.success('SMTP configuration deleted successfully.');
							this.closeDialog(true);
						},
						error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
					});
			}
		});
	}

	onCancel(): void {
		this.closeDialog(false);
	}

	private closeDialog(result: boolean): void {
		this.loading = false;
		this.ref.close(result);
	}
}
