import { NavigationService } from "@app/services/navigation/navigation.service";

export const menuBuilder = (
	nav: NavigationService,
	isOpen: boolean,
) => {
	let sendList: any;
	if(isOpen) {
		sendList = {
			label: "Enviar Lista",
			icon: "fa fa-scroll",
			command: () => nav.goNewList(),
			// badge: "2025 aberto",
		};
	} else {
		sendList = {
			label: "Envio de lista",
			icon: "fa fa-scroll",
			badge: "cadastros fechados",
		};
	}

	return [
		{
			label: "",
			icon: "fa fa-home",
			command: () => nav.goHome(),
		},
		{
			label: "O Bolão",
			divider: false,
			icon: null,
			children: [
				{
					title: null,
					items: [
						{
							label: 'Obituário',
							icon: 'fa fa-book-dead',
							command: () => { nav.goObituary(); },
						},
						{
							label: 'Regulamento',
							icon: 'fa fa-scroll',
							command: () => { nav.goRules(); },
							// badge: "atualizado",
						},
						// {
						// 	label: 'Definições',
						// 	icon: 'fa fa-bullhorn',
						// 	command: () => { nav.goRulesCelebrity(); },
						// 	// badge: "novidade",
						// },
						{
							label: 'Perguntas Freqüentes',
							icon: 'fa fa-question',
							command: () => { nav.goFaq(); },
							badge: "novidade",
						},
						{
							label: "Estatísticas",
							divider: false,
							icon: "fa fa-chart-line",
							command: () => nav.goEstatistics(),
							badge: "novidade",
						},
					],
				}
			]
		},
		{
			label: "Listas",
			divider: false,
			icon: null,
			children: [
				{
					items: [
						sendList,
						{
							label: "Recuperar",
							icon: "fa fa-history",
							command: () => nav.goRecover(),
						},
						{
							label: 'Ranking',
							icon: 'fa fa-medal',
							command: () => { nav.goRanking(); },
						},
					]
				}
			],
		},
		{
			label: "Sobre",
			divider: false,
			icon: null,
			children: [
				{
					title: null,
					items: [
						{
							label: 'Sobre o Bolão',
							icon: 'fa fa-lightbulb',
							command: () => { nav.goAbout(); },
						},
						{
							label: "Contato",
							icon: 'fa fa-envelope',
							command: () => nav.goContact(),
						}
					],
				}
			]
		},
	];
};

export const devMenu = (nav: NavigationService) => {
	return {
		label: "DEV",
		icon: "fa fa-code",
		command: () => nav.goDev(),
	};
}
