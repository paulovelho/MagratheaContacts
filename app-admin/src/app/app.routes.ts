import { Routes } from '@angular/router';
import { getPathModule, getPathComponent, getRedirects } from './shared/functions';

import { MainComponent } from './shared/layout/main.component';

import { environment } from "@environments/environment";
import { ErrorComponent } from './shared/error/error.component';
import { IsLogged } from './services/auth/auth-guard.service';
import { VersionHomeComponent } from './features/version/version-home/version-home.component';
import { InfoHomeComponent } from './features/info/info-home/info-home.component';
let title = environment.title + " | ";


const devRoute = getPathModule(
	['dev'],
	() => import("./features/dev/dev.module").then(m => m.DevModule),
);
const loginRoute = {
	path: 'login',
	loadChildren: () => import("./features/login/login.module").then(m => m.LoginModule),
	title: title + " Login",
};


export const routes: Routes = [
	{ path: '', redirectTo: 'app', pathMatch: 'full' },
	loginRoute,
	{
		path: 'app',
		component: MainComponent,
		canActivate: [IsLogged],
		children: [
			...getPathModule(["emails"], () => import('./features/emails/emails.module').then(m => m.EmailsModule)),
			...getPathModule(["templates"], () => import('./features/templates/templates.module').then(m => m.TemplatesModule)),
			...getPathModule(["sources"], () => import('./features/sources/sources.module').then(m => m.SourcesModule)),
			...getPathModule(["smtp"], () => import('./features/smtp/smtp.module').then(m => m.SmtpModule)),
			...getPathModule(["apikeys", "keys"], () => import('./features/apikey/apikey.module').then(m => m.ApikeyModule)),
			...getPathComponent(['version'], VersionHomeComponent),
			...getPathComponent(['info'], InfoHomeComponent),
			...getPathModule(['logs'], () => import('./features/logs/logs.module').then(m => m.LogsModule)),
			...getPathModule(['cronlogs'], () => import('./features/cronlogs/cronlogs.module').then(m => m.CronlogsModule)),
			...devRoute,
		],
	},
	{
		path: 'single',
		children: [
			...devRoute,
		],
	},
	{ path: '**', component: ErrorComponent }
];

