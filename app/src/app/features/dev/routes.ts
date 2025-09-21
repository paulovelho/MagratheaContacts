import { Routes } from "@angular/router";
import { DevComponent } from "./dev.component";
import { StoreComponent } from './store/store.component';
import { TokenComponent } from './token/token.component';
import { CacheComponent } from './cache/cache.component';
import { BuildComponent } from './build/build.component';
import { ApiComponent } from "./api/api.component";
import { MediasApiComponent } from "./medias-api/medias-api.component";
import { AdsComponent } from "./ads/ads.component";

const getDevRoute = (path: string, component: any) => {
	return { path, component, };
}

export const routes: Routes = [
  { 
		path: '',
		component: DevComponent,
		// outlet: 'dev',
		children: [
			getDevRoute('build', BuildComponent),
			getDevRoute('store', StoreComponent),
			getDevRoute('token', TokenComponent),
			getDevRoute('cache', CacheComponent),
			getDevRoute('api', ApiComponent),
			getDevRoute('ads', AdsComponent),
			getDevRoute('medias', MediasApiComponent),
		]
	},
];
