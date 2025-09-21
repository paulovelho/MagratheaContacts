import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
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
