import { NavigationService } from '@app/services/navigation/navigation.service';

export const getConsentConfig = (): any => {
	return {
		"cookie": {
			"domain": "bolaopenacova.com"
		},
		"position": "bottom",
		"theme": "block",
		"palette": {
			"popup": {
				"background": "#000000",
				"text": "#ffffff",
				"link": "#ffffff"
			},
			"button": {
				"background": "#fc7462", // primary color
				"text": "#000000",
				"border": "transparent"
			}
		},
		"type": "info",
		"content": {
			"message": "A gente tem que dizer (literalmente) que Bolão Pé na Cova usa cookies para melhorar a experiência do usuário.",
			"dismiss": "Tá, eu sei!",
			"deny": "Nem fodendo",
			"link": "Termos de Uso",
			"href": "/bolao/termos",
			"policy": "Cookie Policy"
		}
	};
}

