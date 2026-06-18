import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppWindowComponent } from '../app-window/app-window.component';
import { ConfigService } from '@app/services/config/config.service';

@Component({
	selector: 'app-api-url-panel',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AppWindowComponent],
	template: `
		<app-window title="API" icon="plug">
			<div class="p-card shadow-md p-6">
				<div>
					<span class="font-bold">API URL:</span> {{ apiUrl }}
				</div>
			</div>
		</app-window>
	`,
})
export class ApiUrlPanelComponent {
	public apiUrl: string = inject(ConfigService).apiUrl;
}
