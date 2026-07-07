import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { SharedModule } from '@app/shared/shared.module';
import { Toaster } from '@app/services/toaster/toaster.service';
import { FormService } from '@app/services/form/form.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';
import { iSource } from '@app/features/sources/source.interface';

import { iTemplate, iTemplateVars } from '../template.interface';
import { TemplatesApi } from '../template.api';
import { TemplatesService, extractTemplateVars } from '../template.service';
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';

interface iVarRow {
	name: string;
	default: string;
}

@Component({
	selector: 'app-template-form',
	imports: [
		SharedModule,
		ReactiveFormsModule,
		ConfirmPopupModule,
		TemplatePreviewComponent,
	],
	standalone: true,
	providers: [
		TemplatesApi,
		TemplatesService,
		Toaster,
		FormService,
		ConfirmationService,
	],
	templateUrl: './template-form.component.html',
	styleUrl: './template-form.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class TemplateFormComponent implements OnInit {
	private service = inject(TemplatesService);
	private fs = inject(FormService);
	private ref = inject(DynamicDialogRef);
	private config = inject(DynamicDialogConfig);
	private errorService = inject(ErrorHandler);
	private toaster = inject(Toaster);
	private confirmationService = inject(ConfirmationService);
	private destroyRef = inject(DestroyRef);

	public loading: boolean = false;
	public isNew: boolean = true;
	public form?: FormGroup;
	public sourceOptions: iSelectOption[] = [];
	public template: iTemplate = {
		name: '',
		source_id: null,
		description: '',
		subject: '',
		content: '',
		vars: {},
		active: true,
	};

	// live client-side extraction feeding the var table and the preview;
	// the server re-extracts on save and is the source of truth
	public varRows = signal<iVarRow[]>([]);
	public previewSubject = signal<string>("");
	public previewContent = signal<string>("");
	public previewValues = computed<{ [name: string]: string }>(() =>
		Object.fromEntries(this.varRows().map(v => [v.name, v.default]))
	);

	// remembers defaults of vars temporarily removed from the text, so typing doesn't lose them
	private knownDefaults: { [name: string]: string } = {};

	ngOnInit(): void {
		const data = this.config.data ?? {};
		this.buildSourceOptions(data.sources ?? []);
		this.buildForm();
		if (data.template) this.setData(data.template);
		else if (data.sourceId) this.form?.patchValue({ source_id: data.sourceId });
		this.syncFromForm();
		this.form?.valueChanges
			.pipe(
				debounceTime(300),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => this.syncFromForm());
	}

	private buildSourceOptions(sources: iSource[]) {
		this.sourceOptions = [
			{ label: "Global (any source)", value: 0 },
			...sources.map(s => ({ label: s.name, value: s.id! })),
		];
	}

	private buildForm() {
		const fields = ["name", "description", "source_id", "subject", "content", "active"];
		const mandatory = ["name", "content"];
		this.form = this.fs.Build(fields, mandatory);
		this.form.patchValue({ source_id: 0, active: true });
	}

	private setData(template: iTemplate) {
		this.isNew = false;
		this.template = template;
		this.knownDefaults = Object.fromEntries(
			Object.entries(template.vars).map(([name, v]) => [name, v?.default ?? ""])
		);
		this.form?.patchValue({
			name: template.name,
			description: template.description,
			source_id: template.source_id ?? 0,
			subject: template.subject,
			content: template.content,
			active: template.active,
		});
	}

	private syncFromForm() {
		const subject = this.form?.value.subject ?? "";
		const content = this.form?.value.content ?? "";
		this.previewSubject.set(subject);
		this.previewContent.set(content);
		const names = extractTemplateVars(subject, content);
		this.varRows.set(names.map(name => ({
			name,
			default: this.knownDefaults[name] ?? "",
		})));
	}

	public updateDefault(name: string, value: string) {
		this.knownDefaults[name] = value;
		this.varRows.update(rows => rows.map(r => r.name == name ? { ...r, default: value } : r));
	}

	private getFormTemplate(): iTemplate {
		const value = this.form!.value;
		const vars: iTemplateVars = {};
		this.varRows().forEach(v => vars[v.name] = { default: v.default });
		return {
			name: value.name,
			source_id: value.source_id ? +value.source_id : null,
			description: value.description ?? "",
			subject: value.subject ?? "",
			content: value.content ?? "",
			vars,
			active: !!value.active,
		};
	}

	onSubmit(): void {
		const valid = this.fs.validate(this.form!);
		if (!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			return;
		}
		this.loading = true;
		const template = this.getFormTemplate();
		const operation = this.template.id
			? this.service.update(+this.template.id, template)
			: this.service.create(template);

		operation
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.toaster.success(`Template ${this.isNew ? 'created' : 'updated'} successfully.`);
					this.closeDialog(true);
				},
				error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
			});
	}

	onDelete(event: Event): void {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Are you sure that you want to delete this template?',
			accept: () => {
				this.loading = true;
				this.service.remove(+this.template.id!)
					.pipe(finalize(() => this.loading = false))
					.subscribe({
						next: () => {
							this.toaster.success('Template deleted successfully.');
							this.closeDialog(true);
						},
						error: (err) => this.toaster.error(err.message || 'An unknown error occurred.')
					});
			}
		});
	}

	onCancel(): void {
		this.closeDialog(false);
	}

	private closeDialog(result: boolean): void {
		this.loading = false;
		this.ref.close(result);
	}
}
