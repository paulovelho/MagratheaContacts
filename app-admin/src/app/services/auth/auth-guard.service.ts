import { inject } from '@angular/core';
import { Store } from '../store/store.service';
import { Toaster } from '../toaster/toaster.service';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';

export const IsLogged: CanActivateFn = async (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,	
): Promise<boolean> => {
	const store = inject(Store);
	const navigation = inject(NavigationService);
	const toaster = inject(Toaster);
	let logged = await store.isLogged();
	console.info(store);
	if (!logged) {
		toaster.error("ERROR: User not logged");
		navigation.Login();
			return false;
	}
	return true;
}

export const IsAdmin: CanActivateFn = async (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,	
): Promise<boolean> => {
	const store = inject(Store);
	const toaster = inject(Toaster);
	const navigation = inject(NavigationService);
	const user = await store.loadUserFromStorage();
	if (!user) { toaster.error("user is null"); return false; }
	if (user?.role == 1) {
		return true;
	}
	toaster.error("ERROR: Not authorized - [" + user?.role + "]");
	navigation.Login();
	return false;
}

export const IsManager: CanActivateFn = async (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
): Promise<boolean> => {
	const store = inject(Store);
	const toaster = inject(Toaster);
	const navigation = inject(NavigationService);
	const user = await store.loadUserFromStorage();
	if (!user) { toaster.error("user is null"); return false; }
	if (user?.role == 1 || user?.role == 2) {
		return true;
	}
	toaster.error("ERROR: Not authorized - [" + user?.role + "]");
	navigation.Login();
	return false;
}
