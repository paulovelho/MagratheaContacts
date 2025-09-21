import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api/api.service';
import { map } from 'rxjs';
import { BigLoaderComponent } from '../../big-loader/big-loader.component';

@Component({
	selector: 'app-ad-lojasalada',
	standalone: true,
	imports: [
		CommonModule,
		BigLoaderComponent,
	],
	templateUrl: './ad-lojasalada.component.html',
	styleUrl: './ad-lojasalada.component.scss'
})
export class AdLojasaladaComponent implements OnInit {

	private productUrl = "https://api.lojasalada.com.br/profiles/bolaopnc/product";
	public product: any = null;
	public image: string = "";
	public title: string = "Loja Salada";
	public subtitle: string = "Cultura Pop para vestir";
	public link: string = "https://lojasalada.com.br/";

	constructor(
		private apiService: ApiService,
	) { }

	ngOnInit(): void {
		this.getProduct();
	}

	private getProduct() {
		this.apiService.getApi(this.productUrl)
			.pipe(
				map((rs: any) => {
					if(rs.success) return rs.data;
					else return null;
				})
			)
			.subscribe((rs) => {
				this.product = rs;
				this.parseProduct();
			});
	}

	public parseProduct() {
		if(!this.product) return;
		const data = this.product.data;
		this.link = this.product.link;
		this.image = data.image["image-url"];
		this.title = "new title";
		this.title = data.details["type"] + " Loja Salada";
		let price:number = data.price["price"];
		this.subtitle = data.details["name"] + " - R$" + price.toFixed(2).replace('.', ',');
	}

	public follow() {
		window.open(this.link, '_blank');
	}

}
