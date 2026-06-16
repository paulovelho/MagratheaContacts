import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";

import { ApikeyHomeComponent } from "./apikey-home/apikey-home.component";
import { ApikeyFormComponent } from "./apikey-form/apikey-form.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent([""], ApikeyHomeComponent),
	...getPathComponent(["edit/:id"], ApikeyFormComponent),
	...getPathComponent(["new"], ApikeyFormComponent),
];