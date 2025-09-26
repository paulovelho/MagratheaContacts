import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { Store } from './services/store/store.service';
import { ToastModule } from 'primeng/toast';
import { NavigationService } from './services/navigation/navigation.service';
import { MessageService } from 'primeng/api';
import { RequestCache } from './services/api/cache-interceptor/request-cache';
import { RequestCacheWithMap } from './services/api/cache-interceptor/request-cache-map';

export const appConfig: ApplicationConfig = {
	providers: [
		Store,
		NavigationService,
		MessageService,
		ToastModule,
		provideAnimations(),
		providePrimeNG({
			theme: {
				preset: Aura
			}
		}),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes)
	]
};
