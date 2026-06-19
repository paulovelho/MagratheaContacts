import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';
import { ApikeyApi } from '@app/features/apikey/apikey.api';
import { ApikeyService } from '@app/features/apikey/apikey.service';
import { EmailApi } from '../email.api';
import { iEmailData } from '../email.interface';
import { Toaster } from '@app/services/toaster/toaster.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { FormService } from '@app/services/form/form.service';
import { BaseAppComponent } from '@app/shared/components/base-app.component';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-email-test',
	imports: [SharedModule],
	providers: [
		EmailApi,
		ApikeyApi, ApikeyService,
	],
	templateUrl: './email-test.component.html',
	styleUrl: './email-test.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailTestComponent extends BaseAppComponent implements OnInit {
	public form!: FormGroup;
	public apikeys = signal<iSelectOption[]>([]);
	public loadingKeys = signal(false);
	public result = signal<any>(null);
	public resultError = signal(false);

	constructor(
		private emailApi: EmailApi,
		private apikeyService: ApikeyService,
		private toaster: Toaster,
		private errorHandler: ErrorHandler,
		private fs: FormService,
	) {
		super();
	}

	ngOnInit(): void {
		this.form = this.fs.Build(
			['apikey', 'to', 'subject', 'message'],
			['apikey', 'to', 'subject', 'message'],
		);
		this.loadKeys();
	}

	private loadKeys(): void {
		this.loadingKeys.set(true);
		this.apikeyService.list().subscribe({
			next: (keys) => {
				this.apikeys.set(keys.map(k => ({
					label: k.description ? `${k.description} (${k.val})` : k.val,
					value: k.val,
				})));
				this.loadingKeys.set(false);
				this.refresh();
			},
			error: (err) => {
				this.loadingKeys.set(false);
				this.errorHandler.exception(err);
				this.refresh();
			},
		});
	}

	private getPayload(): iEmailData {
		const v = this.form.value;
		return { key: v.apikey, to: v.to, subject: v.subject, message: v.message, mailType: 'admin-test' };
	}

	private validate(): boolean {
		const valid = this.fs.validate(this.form);
		if (!valid.valid) {
			this.errorHandler.ValidationError(valid.errors);
			return false;
		}
		return true;
	}

	public onAdd(): void {
		if (!this.validate()) return;
		this.setLoading(true);
		this.result.set(null);
		this.emailApi.addTest(this.getPayload())
			.pipe(finalize(() => { this.setLoading(false); this.refresh(); }))
			.subscribe({
				next: (rs) => {
					this.result.set(rs);
					this.resultError.set(false);
					this.toaster.success('E-mail queued successfully.');
				},
				error: (err) => {
					this.result.set(err);
					this.resultError.set(true);
					this.toaster.error(err.message || 'Failed to queue e-mail.');
				},
			});
	}

	public onSend(): void {
		if (!this.validate()) return;
		this.setLoading(true);
		this.result.set(null);
		this.emailApi.sendTest(this.getPayload())
			.pipe(finalize(() => { this.setLoading(false); this.refresh(); }))
			.subscribe({
				next: (rs) => {
					this.result.set(rs);
					this.resultError.set(false);
					this.toaster.success('E-mail sent successfully.');
				},
				error: (err) => {
					this.result.set(err);
					this.resultError.set(true);
					this.toaster.error(err.message || 'Failed to send e-mail.');
				},
			});
	}
}
