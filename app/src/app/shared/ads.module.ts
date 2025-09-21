import { NgModule } from "@angular/core";
import { AdsService } from "@app/services/ads/ads.service";
import { AdLojasaladaComponent } from "./components/ads/ad-lojasalada/ad-lojasalada.component";
import { AdEmptyComponent } from "./components/ads/ad-empty/ad-empty.component";
import { Block350300Component } from "./components/ads/block-350-300/block-350-300.component";

const sharedComponents = [
	Block350300Component,
	AdLojasaladaComponent,
	AdEmptyComponent,
];

@NgModule({
	imports: sharedComponents,
	exports: sharedComponents,
	declarations: [
	],
	providers: [
		AdsService,
	],
})
export class AdsModule {}