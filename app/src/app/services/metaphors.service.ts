import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class MetaphorsService {

	public static giveMeInfinitive(): string {
		const metaphors = [
			"bater as botas",
			"arrastar pra cima",
			"virar camiseta de saudades",
			"dar grau no jet ski",
			"de base",
			"virar sommelier de terra",
			"sair na Sônia Abrão",
			"queimar o miojo",
			"encontrar o Tim Maia",
			"de Olavo",
			"de comes e bebes",
			"de 7 a 1",
			"perder a streak do duolingo",
			"passar a marcha",
			"votar no Brexit",
		].sort(() => Math.random() - 0.5);
		return metaphors[0];

	}
}