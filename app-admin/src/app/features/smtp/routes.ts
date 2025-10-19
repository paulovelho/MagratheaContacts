import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { SmtpListComponent } from "./smtp-list/smtp-list.component";
import { SmtpFormComponent } from "./smtp-form/smtp-form.component";
import { SmtpHomeComponent } from "./smtp-home/smtp-home.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '',
	},
	...getPathComponent([''], SmtpHomeComponent),
	...getPathComponent(["edit/:id"], SmtpFormComponent),
	...getPathComponent(["new"], SmtpFormComponent),
];