import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { EmailHomeComponent } from "./email-home/email-home.component";
import { EmailTestComponent } from "./email-test/email-test.component";
import { EmailProcessComponent } from "./email-process/email-process.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent(['', 'home'], EmailHomeComponent),
	...getPathComponent(['test'], EmailTestComponent),
	...getPathComponent(['process'], EmailProcessComponent),
];
