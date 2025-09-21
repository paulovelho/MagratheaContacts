import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { AuthApi } from "@services/auth/auth.api";
import { NavigationService } from '@services/navigation/navigation.service';
import { Store } from '@services/store/store.service';

@Injectable()
export class AuthService {
	constructor(
		private ApiService: AuthApi,
		private Navigation: NavigationService,
		private Store: Store,
	) { }

	public isAuthenticated(): Promise<boolean> {
		return this.Store.isLogged();
	}

	public getTokenData(token: string): Observable<any> {
		return this.ApiService
			.GetToken(token)
			.pipe(
				map((data: any) => {
					if (data.success) return data.data;
					else return null;
				})
			);
	}

	public login(email: string, password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			return this.ApiService.PostAuth({ email: email, password: password })
				.subscribe({
					next: (result: any) => {
						if (result.success) {
							let data = result.data;
							this.Store.setToken(data.token);
							this.Store.setLoggedUser(data.data);
							resolve(result);
						} else {
							reject(result);
						}
						return result;
					},
					error: (error: any) => {
						let errorMessage = error["message"] || "unknown error";
						reject(errorMessage)
					}
				});
		});
	}

	public logout(): void {
		this.Store.clean();
		this.Navigation.goHome();
	}
}