import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { BaseDialogComponent } from '@app/shared/components/base-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { Toaster } from '@app/services/toaster/toaster.service';

import { EmailApi } from '@app/features/emails/email.api';
import { EmailService } from '@app/features/emails/email.service';
import { iEmail } from '@app/features/emails/email.interface';

import { TemplatesApi } from '../template.api';
import { TemplatesService } from '../template.service';
import { iPromise } from '../template.interface';

@Component({
	selector: 'app-promise-view',
	imports: [
		SharedModule,
	],
	providers: [
		TemplatesApi, TemplatesService,
		EmailApi, EmailService,
		Toaster,
	],
	templateUrl: './promise-view.component.html',
	styleUrl: './promise-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromiseViewComponent extends BaseDialogComponent implements OnInit {
	public promise!: iPromise;
	public email = signal<iEmail | null>(null);
	public processing = signal<boolean>(false);

	constructor(
		private service: TemplatesService,
		private emailService: EmailService,
		private toaster: Toaster,
	) {
		super();
	}

	ngOnInit(): void {
		this.promise = this.getData();
		this.loadEmail();
	}

	private loadEmail(): void {
		if (!this.promise.mailId) return;
		this.setLoading(true);
		this.emailService.getOne(this.promise.mailId)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({
				next: (rs) => this.email.set(rs),
				error: (err) => this.toaster.error(err.message || 'Failed to load the resulting e-mail.'),
			});
	}

	public onProcess(): void {
		this.processing.set(true);
		this.service.processPromise(this.promise.id!)
			.pipe(finalize(() => this.processing.set(false)))
			.subscribe({
				next: () => this.refreshPromise(),
				error: (err) => this.toaster.error(err.message || 'Failed to process the promise.'),
			});
	}

	private refreshPromise(): void {
		this.setLoading(true);
		this.service.getPromise(this.promise.id!)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({
				next: (rs) => {
					this.promise = rs;
					if (rs.failed) this.toaster.error('Promise processing failed.');
					else this.toaster.success('Promise processed successfully.');
					this.loadEmail();
				},
				error: (err) => this.toaster.error(err.message || 'Failed to reload the promise.'),
			});
	}

	public formattedMessage(mail: iEmail): string {
		return mail.message ? mail.message.replace(/\n/g, '<br/>') : '';
	}

	// processed=1 with mailId=null is the failed-render signature (never retried automatically)
	public statusOf(): "pending" | "processed" | "failed" {
		if (!this.promise.processed) return "pending";
		return this.promise.failed ? "failed" : "processed";
	}
}
