import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, effect, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';

import { SharedModule } from '@app/shared/shared.module';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { iSelectOption } from '@app/shared/components/forms/select/select.component';
import { iPromise, iTemplate } from '../template.interface';
import { PromiseViewComponent } from '../promise-view/promise-view.component';

type iPromiseStatus = "pending" | "processed" | "failed";

const PAGE_SIZE = 20;

@Component({
	selector: 'app-promise-list',
	imports: [
		SharedModule,
		TableModule,
	],
	templateUrl: './promise-list.component.html',
	styleUrl: './promise-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromiseListComponent {
	public list = input<iPromise[]>([]);
	public templates = input<iTemplate[]>([]);
	@Output() refresh = new EventEmitter<void>();

	public statusFilter = signal<iPromiseStatus | "">("");
	public statusOptions: iSelectOption[] = [
		{ label: "All statuses", value: "" },
		{ label: "Pending", value: "pending" },
		{ label: "Processed", value: "processed" },
		{ label: "Failed", value: "failed" },
	];

	private visibleCount = signal<number>(PAGE_SIZE);

	public filteredList = computed<iPromise[]>(() => {
		const status = this.statusFilter();
		const list = this.list();
		return status ? list.filter(p => this.statusOf(p) == status) : list;
	});
	public visibleList = computed<iPromise[]>(() => this.filteredList().slice(0, this.visibleCount()));
	public hasMore = computed<boolean>(() => this.visibleCount() < this.filteredList().length);

	constructor(
		private dialogService: DialogService,
	) {
		// filters (or a fresh list) reset how many rows are shown
		effect(() => {
			this.list();
			this.statusFilter();
			this.visibleCount.set(PAGE_SIZE);
		});
	}

	public onStatusFilterChange(value: any): void {
		this.statusFilter.set(value || "");
	}

	public loadMore(): void {
		this.visibleCount.update(c => c + PAGE_SIZE);
	}

	public templateName(promise: iPromise): string {
		const template = this.templates().find(t => t.id == promise.templateId);
		return template?.name ?? `#${promise.templateId}`;
	}

	public openPromise(promise: iPromise): void {
		this.dialogService.open(
			PromiseViewComponent,
			getDialogOptions("Mail promise details", promise),
		).onClose.subscribe(() => this.refresh.emit());
	}

	// processed=1 with mail_id=null is the failed-render signature (never retried automatically)
	public statusOf(promise: iPromise): iPromiseStatus {
		if (!promise.processed) return "pending";
		return promise.failed ? "failed" : "processed";
	}
}
