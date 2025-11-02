import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { ApikeyHomeComponent } from "./apikey-home/apikey-home.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent([""], ApikeyHomeComponent),
];