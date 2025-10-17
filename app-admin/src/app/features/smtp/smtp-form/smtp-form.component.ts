import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { iSmtp } from '../smtp.interface';
import { SmtpService } from '../smtp.service';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpApi } from '../smtp.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { FormService } from '@app/services/form/form.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';

@Component({
	selector: 'app-smtp-form',
	imports: [
		SharedModule,
		AppWindowComponent,
		ReactiveFormsModule,
	],
	standalone: true,
	providers: [
		SmtpApi,
		SmtpService,
		Toaster,
		FormService,
	],
	templateUrl: './smtp-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
		private nav: NavigationService,
		private errorService: ErrorHandler,
		private toaster: Toaster,
	) { }

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.buildForm();
		if (id) {
			this.isNew = false;
			this.loadSmtp(id);
		}
	}
	
	private buildForm() {
		const fields = ["description", "host", "port", "user", "password", "tls_encrypt"];
		const mandatory = ["description", "host", "port", "user", "password"];
		this.form = this.fs.Build(fields, mandatory);
	}

	private loadSmtp(id: string) {
		this.loading = true;
		this.service.view(+id)
			.pipe(finalize(() => this.loading = false))
			.subscribe(data => {
				this.smtp = data;
				this.form?.patchValue(this.smtp);
			});
	}

	onSubmit(): void {
		this.loading = true;
		const valid = this.fs.validate(this.form!);
		console.log("valid", valid);
		if(!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			this.loading = false;
			return;
		}
		const formData = this.form?.value;
		const operation = this.smtp["id"]
			? this.service.update(+this.smtp["id"], formData)
			: this.service.create(formData);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`SMTP configuration ${this.isNew ? 'created' : 'updated'} successfully.`);
					this.onCancel();
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	onCancel(): void {
		this.nav.goSmtpList();
	}
}
