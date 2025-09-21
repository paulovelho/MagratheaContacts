import { Routes } from '@angular/router';
import { getPathModule, getPathComponent, getRedirects } from './shared/functions';

import { MainComponent } from './shared/layout/main.component';

const devRoute = getPathModule(
	['dev'],
	() => import("./features/dev/dev.module").then(m => m.DevModule),
);

export const routes: Routes = [];

