import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from '@app/shared/shared.module';
import { iPromise, iTemplate } from '../template.interface';

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

	public templateName(promise: iPromise): string {
		const template = this.templates().find(t => t.id == promise.templateId);
		return template?.name ?? `#${promise.templateId}`;
	}

	// processed=1 with mail_id=null is the failed-render signature (never retried automatically)
	public statusOf(promise: iPromise): "pending" | "processed" | "failed" {
		if (!promise.processed) return "pending";
		return promise.failed ? "failed" : "processed";
	}
}
