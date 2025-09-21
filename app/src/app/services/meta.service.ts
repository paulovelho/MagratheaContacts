import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ImageLink } from "@app/features/medias/links.class";
import { iDeath } from "@app/features/obituaries/death.interface";
import { environment } from "@environments/environment";

interface MetaObject {
	[index: string]: string
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {

	private siteTitle: string = environment.title;

	constructor(
		private title: Title,
		private meta: Meta,
	) {
	}

	public setTitle(title:string) {
		this.title.setTitle(`${this.siteTitle} | ${title}`);
	}

	public updateNames(m:MetaObject) {
		Object.keys(m).forEach(key => {
			this.meta.updateTag({ name: key, content: m[key], });
		})
	}
	public updateProperties(m:MetaObject): void {
		Object.keys(m).forEach(key => {
			this.meta.updateTag({ property: key, content: m[key], });
		})

	}

	public setBasicMeta() {
		this.updateNames({
			author: "Platypus Web",
			description: "O Bolão Pé na Cova é muito simples: Você manda uma lista de 15 celebridades que você acha que estão no bico do corvo e quem acertar mais falecimentos ganha!"
		});
	}

	public setDead(dead: iDeath) {
		let title: string = `Presunto da vez: ${dead.name}`;
		let winners: string = 
			(dead.winners == 0) ? "Ninguém acertou!" : 
			`${dead.winners == 1 ? "Um acertador leva" : dead.winners + " acertadores levam"} os ${dead.points} pontos dessa encaçapada!`;
		let description: string = `Morreu ${dead.name}, aos ${dead.age} anos. ${winners}`;
		this.setTitle(`Obituário: ${dead.name}`);
		this.setSocialCards(title, description, dead.image_id!);
	}

	public setSocialCards(title: string, description: string, imageId: number) {
		this.updateProperties({
			"og:type": "website",
			"og:title": title,
			"og:description": description,
			"og:site_name": this.siteTitle,
			"og:image": this.getImageLink(imageId),
			"twitter:site": "@bolaopenacova",
			"twitter:image": this.getImageLink(imageId, "150x200"),
			"twitter:card": "summary",
			"twitter:title": title,
			"twitter:description": description,
		});

	}

	// og:image: 1200 x 630
	public getImageLink(imageId: number, size:string = "1200x630") {
		return ImageLink.getLink(imageId, size);
	}

}
