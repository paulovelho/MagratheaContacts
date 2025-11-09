import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';
import { SharedModule } from '@app/shared/shared.module';
import { EmailService } from '../email.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { EmailApi } from '../email.api';
import { BaseAppComponent } from '@app/shared/components/base-app.component';
import { EmailListComponent } from "../email-list/email-list.component";
import { iEmail } from '../email.interface';
import { GeneralModule } from '@app/services/general/general.module';
import { GeneralApi, GeneralService } from '@app/services/general/general.service';

@Component({
	selector: 'app-email-home',
	imports: [
		SharedModule,
		EmailListComponent
	],
	providers: [
		EmailApi, EmailService,
		SourcesApi, SourcesService,
	],
	templateUrl: './email-home.component.html',
	styleUrl: './email-home.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailHomeComponent extends BaseAppComponent implements OnInit {
	public sources:iSelectOption[] = [];
	public emails:iEmail[] = [];

	constructor(
		private toaster: Toaster,
		private errorManager: ErrorHandler,
		private sourceService: SourcesService,
		private emailService: EmailService,
	) {
		super();
	}

	ngOnInit(): void {
		this.loadSources();
	}

	public loadSources() {
		this.setLoading(true);
		this.sourceService
			.getSourceList()
			.catch((err) => { this.toaster.error(err); return []; })
			.then((rs: iSelectOption[]) => {
				this.sources = rs;
				this.setLoading(false);
			});
	}

	public loadBySourceId(s:number) {
		this.setLoading(true);
		this.emailService.getBySource(s)
			.subscribe({
				next: (rs) => {
					this.emails = rs;
					this.setLoading(false);
				},
				error: (err) => this.errorManager.exception(err)
			})
	}

	public sourceSelected(s:any) {
		const selectedSource = s;
		this.loadBySourceId(+selectedSource);
	}

}
