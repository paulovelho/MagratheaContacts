import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { iSource } from '../source.interface';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-sources-item',
	templateUrl: './sources-item.component.html',
	styleUrls: ['./sources-item.component.scss'],
	imports: [
		SharedModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesItemComponent {
	@Input() source!: iSource;
	@Output() edit = new EventEmitter<iSource>();

	constructor() {}

	onEdit(): void {
		this.edit.emit(this.source);
	}
}