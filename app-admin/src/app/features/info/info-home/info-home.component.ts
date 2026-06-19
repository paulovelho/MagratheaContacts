import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { AppWindowComponent } from '@app/shared/components/app-window/app-window.component';
import { ApiUrlPanelComponent } from '@app/shared/components/api-url-panel/api-url-panel.component';
import { SharedModule } from '@app/shared/shared.module';
import { OpenApiService, ParsedOpenApi } from '../openapi.service';

@Component({
	selector: 'app-info-home',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SharedModule, AppWindowComponent, ApiUrlPanelComponent],
	providers: [OpenApiService],
	templateUrl: './info-home.component.html',
	styleUrl: './info-home.component.scss',
})
export class InfoHomeComponent implements OnInit {
	private cdr = inject(ChangeDetectorRef);
	private openApiService = inject(OpenApiService);

	public loading = signal(true);
	public api = signal<ParsedOpenApi | null>(null);
	public expanded = signal<Set<string>>(new Set());

	ngOnInit(): void {
		this.openApiService.load().subscribe({
			next: (parsed) => {
				this.api.set(parsed);
				this.loading.set(false);
				this.cdr.detectChanges();
			},
		});
	}

	public toggle(key: string): void {
		const s = new Set(this.expanded());
		s.has(key) ? s.delete(key) : s.add(key);
		this.expanded.set(s);
	}

	public isExpanded(key: string): boolean {
		return this.expanded().has(key);
	}
}
