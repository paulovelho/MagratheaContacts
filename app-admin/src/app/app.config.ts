import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { Store } from './services/store/store.service';
import { NavigationService } from './services/navigation/navigation.service';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
	providers: [
		Store,
		NavigationService,
		MessageService,
		provideAnimationsAsync(), // deprecated, but required for primeNG
		providePrimeNG({
			theme: {
				preset: Aura
			}
		}),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	]
};
