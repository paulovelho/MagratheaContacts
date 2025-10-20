import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SourcesService } from '../sources.service';
import { iSource } from '../source.interface';
import { SharedModule } from '@app/shared/shared.module';
import { SourcesItemComponent } from '../sources-item/sources-item.component';
import { SourcesApi } from '../source.api';

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
}