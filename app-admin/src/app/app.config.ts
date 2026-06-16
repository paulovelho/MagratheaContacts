import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { PlatypusTheme } from './app.theme';

import { Store } from './services/store/store.service';
import { NavigationService } from './services/navigation/navigation.service';
import { RequestCache } from './services/api/cache-interceptor/request-cache';
import { RequestCacheWithMap } from './services/api/cache-interceptor/request-cache-map';
// import { RequestCacheWithStorage } from './services/api/cache-interceptor/request-cache-storage';
// console.info("theme", PlatypusTheme);

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
    { provide: RequestCache, useClass: RequestCacheWithMap },
	]
};
