import { CanActivateFn, Route } from "@angular/router";
import { environment } from "@environments/environment";

export function getPathModule(
	paths:string[],
	loadFn:() => Promise<any>,
	pageTitle?: string|null,
	canActivate?: CanActivateFn[]
): Route[] {
	return paths.map(p => {
		return {
			path: p,
			loadChildren: loadFn,
			title: environment.title + " | " + (pageTitle ?? p),
		};
	});
}

export function getPathComponent(
	paths: string[],
	component: any,
	pageTitle?: string|null,
	canActivate?: CanActivateFn[]
): Route[] {
	return paths.map(p => {
		return {
			path: p,
			component: component,
			title: environment.title + " | " + (pageTitle ?? p),
		}
	})
}

export function getRedirects(redirects:any): Route[] {
	const keys = Object.keys(redirects); 
	return keys.map((k: string): Route => {
		return {
			path: k, redirectTo: redirects[k], pathMatch: 'full',
		};
	});
}

