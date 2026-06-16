import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '@app/shared/components/base-dialog.component';
import { iEmail } from '../email.interface';
import { SharedModule } from '@app/shared/shared.module';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { GeneralApi, GeneralService } from '@app/services/general/general.service';

@Component({
	selector: 'app-email-view',
	imports: [
		SharedModule
	],
	providers: [
		SourcesApi, SourcesService,
		GeneralApi, GeneralService,
	],
	templateUrl: './email-view.component.html',
	styleUrl: './email-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailViewComponent extends BaseDialogComponent implements OnInit {
	public email!: iEmail;
	public source?: string;
	public emailStatus?: string;
	public formattedMessage: string = '';

	constructor(
		private sourceService: SourcesService,
		private generalService: GeneralService,
	) {
		super();
	}

	ngOnInit(): void {
		this.email = this.getData();
		this.formattedMessage = this.email.message ? this.email.message.replace(/\n/g, '<br/>') : '';
		console.log("email", this.email);
		this.setLoading(true);
		Promise.all([
			this.loadSource(),
			this.loadStatus(),
		])
		.then(() => this.setLoading(false));
	}
	loadSource(): Promise<string> {
		return this.sourceService
			.getNameById(this.email.sourceId)
			.then(s => this.source = s);
	}
	loadStatus(): Promise<string> {
		return this.generalService
			.getEnumById(this.email.status)
			.then(s => this.emailStatus = s);
	}
}
