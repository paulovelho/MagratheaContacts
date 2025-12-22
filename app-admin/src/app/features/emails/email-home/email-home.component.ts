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
import { AppState } from '@app/app.state';
import { Store } from '@app/services/store/store.service';
import { SourceSelectorComponent } from "@app/features/sources/source-selector/source-selector.component";
import { EmailFilterComponent, iFilter } from "../email-filter/email-filter.component";
import { Observable } from 'rxjs';

@Component({
	selector: 'app-email-home',
	imports: [
		SharedModule,
		EmailListComponent,
		SourceSelectorComponent,
		EmailFilterComponent,
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
	public emails: iEmail[] = [];
	public source_id?: number;
	public filter?: iFilter;

	constructor(
		private state: AppState,
		private store: Store,
		private errorManager: ErrorHandler,
		private emailService: EmailService,
	) {
		super();
	}

	ngOnInit(): void {
		this.loadMails();
	}

	public loadMails() {
		this.store.getSource()
			.then(source => {
				console.log("s", source);
				this.source_id = source?.id;
				if(!this.source_id) return;
				this.getMails();
			});
		this.state.subscribe("filter-mails", (filter: iFilter) => {
			this.filter = filter;
			this.getMails();
		})
	}

	public getMails() {
		console.log("get mails ", this.source_id);
		if(!this.source_id) return;
		this.setLoading(true);
		const fn: Observable<iEmail[]> = this.filter ? this.getByFilter(this.source_id, this.filter) : this.getBySource(this.source_id)
		fn.subscribe({
				next: (rs) => {
					this.emails = rs;
					this.setLoading(false);
				},
				error: (err) => this.errorManager.exception(err)
			});
	}

	public getBySource(source: number): Observable<iEmail[]> {
		return this.emailService.getBySource(source);
	}
	public getByFilter(source: number, filter: iFilter): Observable<iEmail[]> {
		return this.emailService.filter(source, filter);
	}

}
