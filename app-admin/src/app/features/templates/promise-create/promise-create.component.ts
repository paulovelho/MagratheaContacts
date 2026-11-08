import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { SharedModule } from '@app/shared/shared.module';
import { Toaster } from '@app/services/toaster/toaster.service';
import { FormService } from '@app/services/form/form.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Store } from '@app/services/store/store.service';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';

import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { iSource } from '@app/features/sources/source.interface';
import { ApikeyApi } from '@app/features/apikey/apikey.api';
import { ApikeyService } from '@app/features/apikey/apikey.service';
import { iApikey } from '@app/features/apikey/apikey.interface';

import { TemplatesApi } from '../template.api';
import { TemplatesService } from '../template.service';
import { iTemplate } from '../template.interface';

const NONE = 0;

@Component({
	selector: 'app-promise-create',
	imports: [
		SharedModule,
		ReactiveFormsModule,
	],
	standalone: true,
	providers: [
		TemplatesApi, TemplatesService,
		SourcesApi, SourcesService,
		ApikeyApi, ApikeyService,
		Toaster,
		FormService,
	],
	templateUrl: './promise-create.component.html',
	styleUrl: './promise-create.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class PromiseCreateComponent implements OnInit {
	private sourcesService = inject(SourcesService);
	private apikeyService = inject(ApikeyService);
	private service = inject(TemplatesService);
	private fs = inject(FormService);
	private errorService = inject(ErrorHandler);
	private toaster = inject(Toaster);
	private nav = inject(NavigationService);
	private store = inject(Store);

	public loading = signal<boolean>(false);
	public form?: FormGroup;

	public sourceOptions = signal<iSelectOption[]>([]);
	public apikeyOptions = signal<iSelectOption[]>([]);
	public templateOptions = signal<iSelectOption[]>([]);

	private templates: iTemplate[] = [];

	ngOnInit(): void {
		this.buildForm();
		this.sourcesService.list().subscribe({
			next: (rs: iSource[]) => {
				this.sourceOptions.set(rs.map(s => ({ label: s.name, value: s.id! })));
				this.preselectSource();
			},
			error: (err) => this.errorService.exception(err),
		});
		this.service.list().subscribe({
			next: (rs) => this.templates = rs,
			error: (err) => this.errorService.exception(err),
		});
	}

	private preselectSource(): void {
		this.store.getSource().then((s) => {
			if (!s?.id) return;
			if (!this.sourceOptions().some(o => o.value == s.id)) return;
			this.form?.patchValue({ source_id: s.id });
			this.onSourceChange(s.id);
		});
	}

	private buildForm() {
		const fields = ["source_id", "key", "template_id", "to", "vars"];
		const mandatory = ["source_id", "key", "template_id", "to"];
		this.form = this.fs.Build(fields, mandatory);
	}

	public onSourceChange(sourceId: any) {
		sourceId = +sourceId;
		this.form?.patchValue({ source_id: sourceId, key: '', template_id: '' });
		this.apikeyOptions.set([]);
		this.templateOptions.set(
			this.templates
				.filter(t => t.source_id == null || t.source_id == sourceId)
				.map(t => ({ label: t.name, value: t.id! }))
		);
		if (!sourceId) return;
		this.apikeyService.getBySource(sourceId).subscribe({
			next: (rs: iApikey[]) => {
				const options = rs.map(k => ({ label: k.description || k.val, value: k.val }));
				this.apikeyOptions.set(options);
				if (options.length === 1) {
					this.form?.patchValue({ key: options[0].value });
				}
			},
			error: (err) => this.errorService.exception(err),
		});
	}

	public onTemplateChange(templateId: any) {
		templateId = +templateId;
		this.form?.patchValue({ template_id: templateId });
		const template = this.templates.find(t => t.id == templateId);
		const vars: { [name: string]: string } = {};
		Object.keys(template?.vars ?? {}).forEach(name => vars[name] = "");
		this.form?.patchValue({ vars: JSON.stringify(vars, null, 2) });
	}

	private parseVars(): { [name: string]: string } | null {
		const raw = this.form?.value.vars;
		if (!raw) return {};
		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}

	onSubmit(): void {
		const valid = this.fs.validate(this.form!);
		if (!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			return;
		}
		const vars = this.parseVars();
		if (vars == null) {
			this.toaster.error("Vars must be a valid JSON object.");
			return;
		}
		const value = this.form!.value;
		const payload = {
			key: value.key,
			template_id: value.template_id,
			to: value.to,
			vars: JSON.stringify(vars),
			process: 0,
		};

		this.loading.set(true);
		this.service.createPromise(payload)
			.pipe(finalize(() => this.loading.set(false)))
			.subscribe({
				next: () => {
					this.toaster.success('Mail promise created successfully.');
					this.nav.goPromises();
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	onCancel(): void {
		this.nav.goPromises();
	}
}
