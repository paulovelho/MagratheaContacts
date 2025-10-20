import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SourcesService } from '../sources.service';
import { iSource } from '../source.interface';
import { SharedModule } from '@app/shared/shared.module';
import { SourcesItemComponent } from '../sources-item/sources-item.component';
import { SourcesApi } from '../source.api';
import { DialogService } from 'primeng/dynamicdialog';
import { SourcesFormComponent } from '../source-form/sources-form.component';
import { getDialogOptions } from '@app/shared/layout/dialog-options';

@Component({
	selector: 'app-sources-list',
	templateUrl: './sources-list.component.html',
	styleUrls: ['./sources-list.component.scss'],
	imports: [
		SharedModule,
		SourcesItemComponent,
	],
	providers: [ SourcesApi, SourcesService ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesListComponent implements OnInit {
	public sources: iSource[] = [];
	public loading = true;

	constructor(
		private cdr: ChangeDetectorRef,
		private service: SourcesService,
		private dialogService: DialogService,
	) {}

	ngOnInit(): void {
		this.loadList();
	}

	loadList(): void {
		this.loading = true;
		this.cdr.detectChanges();
		this.service.list().subscribe((data) => {
			this.sources = data;
			this.loading = false;
			this.cdr.detectChanges();
		});
	}


	newSource(): void {
		this.openModal("New Source", null);
	}

	onEdit(source: iSource): void {
		this.openModal("Edit Source", source);
	}

	public openModal(title:string, data:any):void {
		const ref = this.dialogService.open(SourcesFormComponent, getDialogOptions(title, data, { width: '50%' }));
		ref.onClose.subscribe((refresh: boolean) => {
			if (refresh) {
				this.loadList();
			}
		});
	}
}