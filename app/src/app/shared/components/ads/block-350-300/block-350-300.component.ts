import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdEmptyComponent } from '../ad-empty/ad-empty.component';
import { AdLojasaladaComponent } from "../ad-lojasalada/ad-lojasalada.component";
import { AdsModule } from '@app/shared/ads.module';
import { AdsService } from '@app/services/ads/ads.service';

@Component({
	selector: 'app-block-350-300',
	standalone: true,
	imports: [
		CommonModule,
		AdEmptyComponent,
		AdLojasaladaComponent
	],
	providers: [ AdsService, ],
	templateUrl: './block-350-300.component.html',
	styleUrl: './block-350-300.component.scss'
})
export class Block350300Component implements OnInit {
	@Input() type: string | null = null;

	constructor(
		private adService: AdsService,
	) { }

	ngOnInit(): void {
		if(this.type != null) return;
		this.adService.getAd().then(rs => this.type = rs);
	}

}
