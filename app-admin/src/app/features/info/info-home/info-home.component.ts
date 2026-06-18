import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { ApiUrlPanelComponent } from '@app/shared/components/api-url-panel/api-url-panel.component';
import { SharedModule } from '@app/shared/shared.module';
import * as yaml from 'js-yaml';

interface OpenApiInfo {
	title: string;
	description: string;
	version: string;
}

interface OpenApiEndpoint {
	path: string;
	method: string;
	summary: string;
	tags: string[];
}

interface ParsedOpenApi {
	info: OpenApiInfo;
	endpoints: OpenApiEndpoint[];
	tags: string[];
}

@Component({
	selector: 'app-info-home',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SharedModule, AppWindowComponent, ApiUrlPanelComponent],
	templateUrl: './info-home.component.html',
})
export class InfoHomeComponent implements OnInit {
	private cdr = inject(ChangeDetectorRef);

	public loading = signal(true);
	public api = signal<ParsedOpenApi | null>(null);

	ngOnInit(): void {
		fetch('openapi.yaml')
			.then(r => r.text())
			.then(text => {
				const doc = yaml.load(text) as any;
				const endpoints: OpenApiEndpoint[] = [];

				for (const [path, methods] of Object.entries<any>(doc.paths ?? {})) {
					for (const [method, op] of Object.entries<any>(methods)) {
						endpoints.push({
							path,
							method: method.toUpperCase(),
							summary: op.summary ?? '',
							tags: op.tags ?? [],
						});
					}
				}

				this.api.set({
					info: doc.info,
					endpoints,
					tags: (doc.tags ?? []).map((t: any) => t.name),
				});
				this.loading.set(false);
				this.cdr.detectChanges();
			});
	}
}
