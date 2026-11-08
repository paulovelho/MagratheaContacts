import { Routes } from "@angular/router";
import { getPathComponent } from "@app/shared/functions";
import { CronlogsHomeComponent } from "./cronlogs-home/cronlogs-home.component";

export const routes: Routes = [
	...getPathComponent(['', 'home'], CronlogsHomeComponent),
];
