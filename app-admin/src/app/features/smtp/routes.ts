import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { SmtpListComponent } from "./smtp-list/smtp-list.component";
import { SmtpFormComponent } from "./smtp-form/smtp-form.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list',
	},
	...getPathComponent(["list"], SmtpListComponent),
	...getPathComponent(["edit/:id"], SmtpFormComponent),
	...getPathComponent(["new"], SmtpFormComponent),
];