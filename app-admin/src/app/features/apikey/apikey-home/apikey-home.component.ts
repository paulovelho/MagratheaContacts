import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApikeyListComponent } from '../apikey-list/apikey-list.component';
import { ApikeyFormComponent } from '../apikey-form/apikey-form.component';
import { dialogOptions, getDialogOptions } from '@app/shared/layout/dialog-options';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-apikey-home',
	templateUrl: './apikey-home.component.html',
	styleUrls: ['./apikey-home.component.scss'],
	imports: [
		SharedModule,
		ApikeyListComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApikeyHomeComponent {
	@ViewChild(ApikeyListComponent) listComponent!: ApikeyListComponent;

	constructor(private dialogService: DialogService) {}

}