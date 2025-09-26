import { Routes } from "@angular/router";
import { DevComponent } from "./dev.component";
import { StoreComponent } from './store/store.component';
import { TokenComponent } from './token/token.component';
import { CacheComponent } from './cache/cache.component';
import { BuildComponent } from './build/build.component';
import { ApiComponent } from "./api/api.component";
import { MediasApiComponent } from "./medias-api/medias-api.component";

export const routes: Routes = [
  { 
		path: '',
		component: DevComponent,
		children: [
			{ path: 'build', component: BuildComponent, pathMatch: 'full' },
			{ path: 'store', component: StoreComponent, pathMatch: 'full' },
			{ path: 'token', component: TokenComponent, pathMatch: 'full' },
			{ path: 'cache', component: CacheComponent, pathMatch: 'full' },
			{ path: 'api', component: ApiComponent, pathMatch: 'full' },
			{ path: 'medias', component: MediasApiComponent, pathMatch: 'full' },
		]
	},
];
