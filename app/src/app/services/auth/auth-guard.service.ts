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
	let logged = await store.isLogged();
	if (!logged) {
		const toaster = inject(Toaster);
		toaster.error("ERROR: User not logged");
		return false;
	}
	return true;
}
