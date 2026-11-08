import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { TemplateHomeComponent } from "./template-home/template-home.component";
import { PromiseHomeComponent } from "./promise-home/promise-home.component";
import { PromiseCreateComponent } from "./promise-create/promise-create.component";
import { TemplateGuideComponent } from "./template-guide/template-guide.component";

export const routes: Routes = [
	...getPathComponent(['', 'home'], TemplateHomeComponent),
	...getPathComponent(['promises'], PromiseHomeComponent),
	...getPathComponent(['promises/create'], PromiseCreateComponent),
	...getPathComponent(['guide'], TemplateGuideComponent),
];
