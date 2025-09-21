import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { iDeath } from '@app/features/obituaries/death.interface';
import { iRankingBet } from '@app/features/ranking/ranking.interface';
import { externalLinks } from './external-links';

@Injectable()
export class NavigationService {

	private pagesUrl: string = "";

	constructor(
		private router: Router
	) { }

	private cleanName(str:string): string {
		str = str.replace(/ /g, '_');
		str = str.replace(/[^\w\s]/gi, "");
		return str.toLocaleLowerCase();
	}

	public appTo(destination: string[]): void {
		this.router.navigate([this.pagesUrl, ...destination]);
	}

	public goHome(): void {
		this.router.navigate([this.pagesUrl]);
	}

	public goDev(): void {
		this.appTo(["dev"]);
	}

	public goRanking(): void {
		this.appTo(["ranking"]);
	}
	public goObituary(): void {
		this.appTo(["obituario"]);
	}
	public goObituaryYear(year:number|string) {
		this.appTo(["obituario", "ano", year.toString()]);
	}

	public goDeathView(death: iDeath): void {
		return this.goDeadView(death.id, death.name);
	}
	public goRankingView(death: iRankingBet) {
		this.goDeadView(death.id, death.name);
	}
	public goDeadView(id: number|string, name: string): void {
		let clean_name = this.cleanName(name);
		let hash = `${id}-${clean_name}`;
		this.appTo(["presuntos", hash]);
	}

	public goNewList(): void {
		this.appTo(["listas", "cadastrar"]);
	}
	public goRecover(): void {
		this.appTo(["listas", "recuperar"]);
	}
	public goViewList(hash: string): void {
		this.appTo(["listas", "ver-lista", hash]);
	}

	public goAbout(): void {
		this.appTo(["bolao", "sobre"]);
	}
	public goRules = (): void => this.appTo(["regulamento"]);
	public goRulesCelebrity = (): void => this.appTo(["regulamento", "celebridade"]);
	public goRulesJuris = (): void => this.appTo(["regulamento", "jurisprudencias"]);
	public goFaq = (): void => this.appTo(["bolao", "faq"]);

	public goTerms = (): void => this.appTo(["bolao", "termos"]);
	public getTerms = (): string => "/bolao/termos";

	public goContact = (): void => this.appTo(["contato"]);

	public goRetro = (year: string): void => this.appTo(["retrospectiva", year]);

	public goEstatistics = (): void => {
		window.location.href = externalLinks.statistics;
	}

}
