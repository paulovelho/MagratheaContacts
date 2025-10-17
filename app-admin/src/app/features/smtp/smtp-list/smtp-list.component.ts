import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { ButtonComponent } from '@app/shared/components/forms/button/button.component';
import { iSmtp } from '../smtp.interface';
import { SmtpService } from '../smtp.service';
import { SmtpApi } from '../smtp.api';
import { SharedModule } from '@app/shared/shared.module';
import { NavigationService } from '@app/services/navigation/navigation.service';

@Component({
	selector: 'app-smtp-list',
	imports: [
		AppWindowComponent,
		SharedModule,
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

	constructor(
		private service: SmtpService,
		public nav: NavigationService,
	) {}

	ngOnInit(): void {
		this.service.list().subscribe((data) => {
			this.smtps = data;
			this.loading = false;
		});
	}

	editSmtp(smtp: iSmtp): void {
		console.log('Edit SMTP:', smtp);
	}

	deleteSmtp(smtp: iSmtp): void {
		console.log('Delete SMTP:', smtp);
	}
}