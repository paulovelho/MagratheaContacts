import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AppWindowComponent } from "@app/shared/components/app-window/app-window.component";
import { ApiUrlPanelComponent } from "@app/shared/components/api-url-panel/api-url-panel.component";
import { VersionChangelogComponent } from "../version-changelog/version-changelog.component";
import { VersionService } from '../version.service';
import { VersionApi } from '../version.api';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-version-home',
	imports: [
		SharedModule,
		AppWindowComponent,
		ApiUrlPanelComponent,
		VersionChangelogComponent
	],
	providers: [
		VersionService,
		VersionApi,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './version-home.component.html',
	styleUrl: './version-home.component.scss'
})
export class VersionHomeComponent implements OnInit {
	public loading: boolean = true;
	public version: any = {};
	constructor(
		private cdr: ChangeDetectorRef,
		private service: VersionService,
	) { }

	ngOnInit(): void {
		this.loading = true;
		this.cdr.detectChanges();

		this.service.getVersion()
			.subscribe(v => {
				console.info("version", v);
				this.version = v;
				this.loading = false;
				this.cdr.detectChanges();
			});
	}
}
