import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";

import { SourcesHomeComponent } from "./sources-home/sources-home.component";
import { SourcesFormComponent } from "./source-form/sources-form.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent([""], SourcesHomeComponent),
	...getPathComponent(["edit/:id"], SourcesFormComponent),
	...getPathComponent(["new"], SourcesFormComponent),
];