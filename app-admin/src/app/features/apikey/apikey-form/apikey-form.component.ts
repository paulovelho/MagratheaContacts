import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApikeyService } from '../apikey.service';
import { iApikey } from '../apikey.interface';
import { SharedModule } from '@app/shared/shared.module';
import { FormService } from '@app/services/form/form.service';
import { ApikeyApi } from '../apikey.api';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { finalize } from 'rxjs';
import { Toaster } from '@app/services/toaster/toaster.service';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';

@Component({
	selector: 'app-apikey-form',
	templateUrl: './apikey-form.component.html',
	styleUrls: ['./apikey-form.component.scss'],
	imports: [
		SharedModule,
	],
	providers: [
		ApikeyApi, ApikeyService,
		SourcesApi, SourcesService,
		DialogService,
	],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ApikeyFormComponent implements OnInit {
	public loading: boolean = false;
	public form!: FormGroup;
	public isNew: boolean = true;
	public apikey: iApikey|null = {
		id: 0,
		source_id: 0,
		val: '',
		description: '',
		priority: 0,
		uses: 0,
		usageLimit: 0,
		expiration: '',
		simulate: false,
		active: false
	};
	public sources: iSelectOption[] = [];
	public loadingSources: boolean = false;

	constructor(
		private fs: FormService,
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private service: ApikeyService,
		private sourceService: SourcesService,
		private toaster: Toaster,
		private errorService: ErrorHandler,
	) { }

	ngOnInit(): void {
		this.loadSources();
		this.buildForm();
		const apikey: iApikey = this.config.data;
		if (apikey) {
			this.setData(apikey);
		} else {
			this.loadVal();
		}
	}

	public loadSources() {
		this.loadingSources = true;
		this.sourceService.getSourceList()
			.then(rs => {
				this.loadingSources = false;
				this.sources = rs
			})
			.catch(err => console.error(err));
	}

	public loadVal() {
		this.loading = true;
		this.service.createKey()
			.subscribe({
				next: (rs) => {
					this.loading = false;
					this.form.patchValue({ val: rs });
				},
				error: (err) => console.error(err),
			});
	}

	public buildForm() {
		this.form = this.fs.Build(
			["val", "source_id", "description", "priority", "usageLimit", "expiration", "simulate", "active"],
			["val", "source_id", "description"]
		);
	}

	private setData(apikey: iApikey) {
		this.apikey = apikey;
		this.isNew = false;
		this.form.patchValue(apikey);
	}

	onSubmit(): void {
		const valid = this.fs.validate(this.form!);
		if(!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			return;
		}
		this.loading = true;
		const formData = this.fs.getChangedData(this.form!);
		const operation = this.apikey!["id"]
			? this.service.update(+this.apikey!["id"], formData as Partial<iApikey>)
			: this.service.create(formData as iApikey);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`API Key ${this.isNew ? 'created' : 'updated'} successfully.`);
					this.closeDialog(true);
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	public closeDialog(result: boolean): void {
		this.loading = false;
		this.ref.close(result);
	}
}
