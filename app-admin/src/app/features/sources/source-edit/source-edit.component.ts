import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { InputComponent } from '@app/shared/components/forms/input/input.component';
import { SelectComponent } from '@app/shared/components/forms/select/select.component';
import { ButtonComponent } from '@app/shared/components/forms/button/button.component';
import { iSource } from '../source.interface';
import { SourcesService } from '../sources.service';
import { SourcesApi } from '../source.api';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-source-edit',
	imports: [
		SharedModule,
		AppWindowComponent,
		InputComponent,
		SelectComponent,
		ButtonComponent,
		FormsModule,
	],
	providers: [
		SourcesApi,
		SourcesService,
	],
	templateUrl: './source-edit.component.html',
	styleUrls: ['./source-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceEditComponent implements OnInit {
	public loading: boolean = false;
	public source: iSource = { name: '', mail_from: '', smtp_id: undefined };
	public smtpOptions = [
		{ label: 'SMTP 1', value: 1 },
		{ label: 'SMTP 2', value: 2 },
		{ label: 'SMTP 3', value: 3 },
	];

	constructor(private service: SourcesService) {}

	ngOnInit(): void {
		// Initialization logic if needed
	}

	onSubmit(): void {
		this.loading = true;
		if (this.source.smtp_id) {
			this.service.update(this.source.smtp_id, this.source).subscribe(() => {
				this.loading = false;
				console.log('Source updated successfully');
			});
		} else {
			this.service.create(this.source).subscribe(() => {
				this.loading = false;
				console.log('Source created successfully');
			});
		}
	}

	onCancel(): void {
		console.log('Edit canceled');
	}
}
