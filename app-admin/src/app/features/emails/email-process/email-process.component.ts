import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EmailApi } from '../email.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { BaseAppComponent } from '@app/shared/components/base-app.component';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-email-process',
	imports: [SharedModule],
	providers: [EmailApi],
	templateUrl: './email-process.component.html',
	styleUrl: './email-process.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailProcessComponent extends BaseAppComponent {
	public result = signal<any>(null);
	public resultError = signal(false);

	constructor(
		private emailApi: EmailApi,
		private toaster: Toaster,
	) {
		super();
	}

	public onProcess(): void {
		this.setLoading(true);
		this.result.set(null);
		this.emailApi.processNext()
			.pipe(finalize(() => { this.setLoading(false); this.refresh(); }))
			.subscribe({
				next: (rs) => {
					this.result.set(rs);
					this.resultError.set(false);
					this.toaster.success('Processed successfully.');
				},
				error: (err) => {
					this.result.set(err);
					this.resultError.set(true);
					this.toaster.error(err.message || 'Failed to process.');
				},
			});
	}
}
