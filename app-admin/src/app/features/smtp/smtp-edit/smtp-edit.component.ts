import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { iSmtp } from '../smtp.interface';
import { SmtpService } from '../smtp.service';
import { SharedModule } from '@app/shared/shared.module';
import { SmtpApi } from '../smtp.api';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
	selector: 'app-smtp-edit',
	imports: [
		SharedModule,
		AppWindowComponent,
		FormsModule,
	],
	standalone: true,
	providers: [
		SmtpApi,
		SmtpService,
		Toaster,
	],
	templateUrl: './smtp-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmtpEditComponent implements OnInit {
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

	private service = inject(SmtpService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private toaster = inject(Toaster);

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.loading = true;
			this.service.view(+id)
				.pipe(finalize(() => this.loading = false))
				.subscribe(data => {
					this.smtp = data;
				});
		}
	}

	onSubmit(): void {
		this.loading = true;
		const operation = this.smtp["id"]
			? this.service.update(+this.smtp["id"], this.smtp)
			: this.service.create(this.smtp);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`SMTP configuration ${this.smtp["id"] ? 'updated' : 'created'} successfully.`);
					this.goBack();
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	onCancel(): void {
		this.goBack();
	}

	private goBack(): void {
		this.router.navigate(['/app/smtp/list']);
	}
}