import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApikeyService } from '../apikey.service';
import { iApikey } from '../apikey.interface';
import { SharedModule } from '@app/shared/shared.module';
import { ApikeyApi } from '../apikey.api';
import { DialogService } from 'primeng/dynamicdialog';
import { ApikeyFormComponent } from '../apikey-form/apikey-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';

@Component({
	selector: 'app-apikey-list',
	templateUrl: './apikey-list.component.html',
	styleUrls: ['./apikey-list.component.scss'],
	imports: [
		SharedModule,
	],
	providers: [ ApikeyApi, ApikeyService ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApikeyListComponent implements OnInit {
	public apikeys: iApikey[] = [];
	public loading = true;

	constructor(
		private cdr: ChangeDetectorRef,
		private service: ApikeyService,
		private dialogService: DialogService,
	) {}

	ngOnInit(): void {
		this.loadList();
	}

	loadList(): void {
		this.loading = true;
		this.cdr.detectChanges();
		this.service.list().subscribe((data) => {
			this.apikeys = data;
			this.loading = false;
			this.cdr.detectChanges();
		});
	}


	newApikey(): void {
		this.openModal("New API Key", null);
	}

	onEdit(apikey: iApikey): void {
		this.openModal("Edit API Key", apikey);
	}

	public openModal(title:string, data:any):void {
		const ref = this.dialogService.open(ApikeyFormComponent, getDialogOptions(title, data, { width: '50%' }));
		ref.onClose.subscribe((refresh: boolean) => {
			if (refresh) {
				this.loadList();
			}
		});
	}
}
