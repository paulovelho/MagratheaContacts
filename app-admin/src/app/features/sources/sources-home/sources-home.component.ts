import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SourcesListComponent } from '../sources-list/sources-list.component';
import { SourcesFormComponent } from '../source-form/sources-form.component';
import { dialogOptions, getDialogOptions } from '@app/shared/layout/dialog-options';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-sources-home',
	templateUrl: './sources-home.component.html',
	styleUrls: ['./sources-home.component.scss'],
	imports: [
		SharedModule,
		SourcesListComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesHomeComponent {
	@ViewChild(SourcesListComponent) listComponent!: SourcesListComponent;

	constructor(private dialogService: DialogService) {}

	onNewSource(): void {
		const ref = this.dialogService.open(SourcesFormComponent, getDialogOptions("New Source", null, { width: '50%' }));

		ref.onClose.subscribe((refresh: boolean) => {
			if (refresh) {
				this.listComponent.loadList();
			}
		});
	}
}