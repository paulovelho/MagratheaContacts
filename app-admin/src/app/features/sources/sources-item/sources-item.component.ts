import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { iSource } from '../source.interface';
import { SourcesFormComponent } from '../source-form/sources-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
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
	@Output() refresh = new EventEmitter<void>();

	constructor(private dialogService: DialogService) {}

	onEdit(): void {
		const ref = this.dialogService.open(SourcesFormComponent, getDialogOptions("Edit Source", this.source));

		ref.onClose.subscribe((refresh: boolean) => {
			if (refresh) {
				this.refresh.emit();
			}
		});
	}
}