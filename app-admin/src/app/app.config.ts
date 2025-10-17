import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { Store } from './services/store/store.service';
import { NavigationService } from './services/navigation/navigation.service';
import { MessageService } from 'primeng/api';

import { PlatypusTheme } from './app.theme';

export const appConfig: ApplicationConfig = {
	providers: [
		Store,
		NavigationService,
		MessageService,
		provideAnimationsAsync(), // deprecated, but required for primeNG
		providePrimeNG({
			theme: {
				preset: PlatypusTheme,
			},
		}),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	]
};
