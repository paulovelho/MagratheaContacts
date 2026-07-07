import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SharedModule } from '@app/shared/shared.module';
import { Store } from '@app/services/store/store.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { iSource } from '@app/features/sources/source.interface';

import { TemplatesApi } from '../template.api';
import { TemplatesService } from '../template.service';
import { iPromise, iTemplate } from '../template.interface';
import { PromiseListComponent } from '../promise-list/promise-list.component';

const ALL = 0;

@Component({
	selector: 'app-promise-home',
	imports: [
		SharedModule,
		PromiseListComponent,
	],
	providers: [
		TemplatesApi, TemplatesService,
		SourcesApi, SourcesService,
	],
	templateUrl: './promise-home.component.html',
	styleUrl: './promise-home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromiseHomeComponent implements OnInit {
	private store = inject(Store);
	private errorManager = inject(ErrorHandler);
	private service = inject(TemplatesService);
	private sourcesService = inject(SourcesService);

	public loading = signal<boolean>(false);
	public templates = signal<iTemplate[]>([]);
	public promises = signal<iPromise[]>([]);
	public sourceId = signal<number>(ALL);
	public templateId = signal<number>(ALL);

	public sourceOptions = signal<iSelectOption[]>([]);
	public templateOptions = computed<iSelectOption[]>(() => [
		{ label: "All templates", value: ALL },
		...this.templates().map(t => ({ label: t.name, value: t.id! })),
	]);

	public hasFilter = computed<boolean>(() => !!this.sourceId() || !!this.templateId());
	public failedPromises = computed<number>(() => this.promises().filter(p => p.failed).length);
	public pendingPromises = computed<number>(() => this.promises().filter(p => !p.processed).length);

	ngOnInit(): void {
		this.sourcesService.list().subscribe({
			next: (rs: iSource[]) => {
				this.sourceOptions.set([
					{ label: "All sources", value: ALL },
					...rs.map(s => ({ label: s.name, value: s.id! })),
				]);
			},
			error: (err) => this.errorManager.exception(err),
		});
		this.service.list().subscribe({
			next: (rs) => this.templates.set(rs),
			error: (err) => this.errorManager.exception(err),
		});
		this.store.getSource().then(source => {
			if (source?.id) {
				this.sourceId.set(source.id);
				this.loadPromises();
			}
		});
	}

	public onSourceChange(value: any) {
		this.sourceId.set(+value);
		this.loadPromises();
	}

	public onTemplateChange(value: any) {
		this.templateId.set(+value);
		this.loadPromises();
	}

	public loadPromises() {
		const source = this.sourceId();
		const template = this.templateId();
		if (!source && !template) {
			this.promises.set([]);
			return;
		}
		// template filter may span sources (global templates), so it drives the fetch;
		// when both are set, the other filter is applied client-side
		const fetch: Observable<iPromise[]> = template
			? this.service.getPromisesByTemplate(template)
				.pipe(map(rs => source ? rs.filter(p => p.sourceId == source) : rs))
			: this.service.getPromisesBySource(source);

		this.loading.set(true);
		fetch.subscribe({
			next: (rs) => {
				this.promises.set(rs);
				this.loading.set(false);
			},
			error: (err) => {
				this.loading.set(false);
				this.errorManager.exception(err);
			}
		});
	}
}
