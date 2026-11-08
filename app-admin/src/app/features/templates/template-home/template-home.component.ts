import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { filter } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '@app/shared/shared.module';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { iSource } from '@app/features/sources/source.interface';

import { TemplatesApi } from '../template.api';
import { TemplatesService } from '../template.service';
import { iTemplate } from '../template.interface';
import { TemplateListComponent } from '../template-list/template-list.component';
import { TemplateFormComponent } from '../template-form/template-form.component';

@Component({
	selector: 'app-template-home',
	imports: [
		SharedModule,
		TemplateListComponent,
	],
	providers: [
		TemplatesApi, TemplatesService,
		SourcesApi, SourcesService,
	],
	templateUrl: './template-home.component.html',
	styleUrl: './template-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateHomeComponent implements OnInit {
	private dialog = inject(DialogService);
	private errorManager = inject(ErrorHandler);
	private service = inject(TemplatesService);
	private sourcesService = inject(SourcesService);

	public loading = signal<boolean>(false);
	public sources = signal<iSource[]>([]);
	public templates = signal<iTemplate[]>([]);

	ngOnInit(): void {
		this.sourcesService.list().subscribe({
			next: (rs: iSource[]) => this.sources.set(rs),
			error: (err) => this.errorManager.exception(err),
		});
		this.loadTemplates();
	}

	public loadTemplates() {
		this.loading.set(true);
		this.service.list().subscribe({
			next: (rs) => {
				this.templates.set(rs);
				this.loading.set(false);
			},
			error: (err) => {
				this.loading.set(false);
				this.errorManager.exception(err);
			}
		});
	}

	public newTemplate() {
		this.openForm("New Template", { sources: this.sources() });
	}

	public onEditTemplate(template: iTemplate) {
		this.openForm("Edit Template", { sources: this.sources(), template });
	}

	private openForm(title: string, data: any) {
		const ref = this.dialog.open(TemplateFormComponent, getDialogOptions(title, data, { width: `80%` }));
		ref.onClose
			.pipe(filter(result => !!result))
			.subscribe(() => this.loadTemplates());
	}
}
