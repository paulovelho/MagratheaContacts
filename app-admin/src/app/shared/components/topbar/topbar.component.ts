import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@services/layout/layout.service';
import { FontAwesomeSharedModule } from '@app/shared/font-awesome.module';
import { LogoComponent } from "../logo/logo.component";
import { Store } from '@app/services/store/store.service';
import { AppState } from '@app/app.state';
import { DialogService } from 'primeng/dynamicdialog';
import { SourceSelectorComponent } from '@app/features/sources/source-selector/source-selector.component';
import { SourcesApi } from '@app/features/sources/source.api';
import { SourcesService } from '@app/features/sources/sources.service';
import { getDialogOptions } from '@app/shared/layout/dialog-options';
import { BaseAppComponent } from '../base-app.component';

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    FontAwesomeSharedModule,
    LogoComponent,
],
	styleUrl: 'topbar.component.scss',
	templateUrl: `topbar.component.html`,
	providers: [DialogService, SourcesApi, SourcesService],
})
export class AppTopbar extends BaseAppComponent implements OnInit {
	items!: MenuItem[];
	public darkIcon: string;
	public source: string = "-";

	constructor(
		public layoutService: LayoutService,
		private store: Store,
		private state: AppState,
		private dialogService: DialogService,
	) {
		super();
		this.darkIcon = layoutService.isDarkTheme ? 'sun' : 'moon';
	}

	ngOnInit(): void {
		this.store.getSource().then(s => { this.source = s?.name ?? '-' });
		this.state.subscribe("source", (s: any) => {
			this.source = s?.name ?? '-';
			this.refresh();
		});
	}

	toggleDarkMode() {
		this.layoutService.toggleDarkMode();
	}
	toggleDrawer() {
		this.layoutService.drawerToggle();
	}

	openSourceSelector() {
		this.dialogService.open(SourceSelectorComponent, getDialogOptions('Select Source', null, { width: '400px' }));
	}
}
