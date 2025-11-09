import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { EmailHomeComponent } from "./email-home/email-home.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent(['', 'home'], EmailHomeComponent),
];
