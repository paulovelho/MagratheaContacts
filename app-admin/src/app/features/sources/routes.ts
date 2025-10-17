import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { SourceListComponent } from "./source-list/source-list.component";
import { SourceEditComponent } from "./source-edit/source-edit.component";

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'new',
	},
	...getPathComponent(["list"], SourceListComponent),
	...getPathComponent(["edit/:id"], SourceEditComponent),
	...getPathComponent(["new"], SourceEditComponent),
];