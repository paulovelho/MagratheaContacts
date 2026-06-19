import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { AppState } from '@app/app.state';
import { Store } from '@app/services/store/store.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { BaseAppComponent } from '@app/shared/components/base-app.component';
import { SharedModule } from '@app/shared/shared.module';
import { SourcesService } from '../sources.service';
import { iSource } from '../source.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-source-selector',
	imports: [
		SharedModule,
	],
	templateUrl: './source-selector.component.html',
	styleUrl: './source-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceSelectorComponent extends BaseAppComponent implements OnInit {
	public sources:iSource[] = [];
	public selected?: number;

	constructor(
		private state: AppState,
		private store: Store,
		private toaster: Toaster,
		private sourceService: SourcesService,
		@Optional() private ref: DynamicDialogRef,
	) {
		super();
	}

	ngOnInit(): void {
		this.loadSources();
	}

	public loadSources() {
		this.setLoading(true);
		this.store.getSource()
			.then((s) => this.selected = s?.id);
		this.sourceService
			.list()
			.subscribe({
				next: (rs: iSource[]) => {
					this.sources = rs;
					this.setLoading(false);
				}, 
				error: (err) => { this.toaster.error(err); return []; }
			});
	}

	public sourceSelected(source_id:any) {
		const source: iSource = this.sources.filter(s => s.id == source_id)[0];
		if(!source) return;
		this.store.setSource(source);
		this.state.emit("source", source);
		this.ref?.close(source);
	}



}
