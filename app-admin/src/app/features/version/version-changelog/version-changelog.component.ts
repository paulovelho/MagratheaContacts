import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AppWindowComponent } from "@app/shared/components/app-window/app-window.component";
import { VersionApi } from '../version.api';
import { VersionService } from '../version.service';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-version-changelog',
	imports: [
		SharedModule,
		AppWindowComponent
	],
	providers: [
		VersionApi,
		VersionService,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './version-changelog.component.html',
	styleUrl: './version-changelog.component.scss'
})
export class VersionChangelogComponent {
	public loading: boolean = false;
	public data: string = "";

	constructor(
		private cdr: ChangeDetectorRef,
		private service: VersionService,
	) { }

	public loadChangelog() {
		this.loading = true;
		this.cdr.detectChanges();
		this.service.getChangelog()
			.subscribe((rs) => {
				this.data = rs;
				this.loading = false;
				this.cdr.detectChanges();
			});
	}
}
