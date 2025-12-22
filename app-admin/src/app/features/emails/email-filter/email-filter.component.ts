import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseAppComponent } from '@app/shared/components/base-app.component';
import { SharedModule } from '@app/shared/shared.module';
import { EmailService } from '../email.service';
import { AppState } from '@app/app.state';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface iFilter {
	mail_to?: string;
	mail_from?: string;
	type?: string;
	status?: number;
}

@Component({
  selector: 'app-email-filter',
  imports: [
		SharedModule,
	],
  templateUrl: './email-filter.component.html',
  styleUrl: './email-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFilterComponent extends BaseAppComponent implements OnInit {
	public filter: iFilter = {};
	public status: any[] = [];
	private filterChanged$ = new Subject<iFilter>();

	constructor (
		private service: EmailService,
		private state: AppState,
	) { super(); }

	ngOnInit(): void {
		this.status = this.service.getMailStatus();
		this.filterChanged$
			.pipe(debounceTime(750))
			.subscribe(() => this.processFilter());
	}

	public onFilterChange(): void {
		this.filterChanged$.next(this.filter);
	}

	private processFilter() {
		this.state.emit("filter-mails", this.filter);
	}

}
