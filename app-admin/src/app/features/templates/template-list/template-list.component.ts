import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from '@app/shared/shared.module';
import { iSource } from '@app/features/sources/source.interface';
import { iTemplate } from '../template.interface';

@Component({
	selector: 'app-template-list',
	imports: [
		SharedModule,
		TableModule,
	],
	templateUrl: './template-list.component.html',
	styleUrl: './template-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent {
	public list = input<iTemplate[]>([]);
	public sources = input<iSource[]>([]);
	public edit = output<iTemplate>();

	public sourceName(template: iTemplate): string {
		if (template.source_id == null) return "global";
		const source = this.sources().find(s => s.id == template.source_id);
		return source?.name ?? `#${template.source_id}`;
	}

	public varCount(template: iTemplate): number {
		return Object.keys(template.vars).length;
	}
}
