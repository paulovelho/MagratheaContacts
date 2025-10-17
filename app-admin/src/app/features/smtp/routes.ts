import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { SmtpListComponent } from "./smtp-list/smtp-list.component";
import { SmtpEditComponent } from "./smtp-edit/smtp-edit.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'new',
	},
	...getPathComponent(["list"], SmtpListComponent),
	...getPathComponent(["edit/:id"], SmtpEditComponent),
	...getPathComponent(["new"], SmtpEditComponent),
];