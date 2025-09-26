import { AuthService } from "@app/services/auth/authentication.service";
import { NavigationService } from "@app/services/navigation/navigation.service";
import { environment } from '@environments/environment';
import { ImagesConfig } from "@environments/images";
import { MenuItem } from "primeng/api";

export const menuBuilder = async (
	nav: NavigationService,
):Promise<MenuItem[]> => {

	return [
		{
			label: "Setup",
			icon: "fa fa-cogs",
			items: [
				{
					label: "Configurações",
					icon: "fa fa-cog",
					command: () => nav.goSetupConfig(),
				},
				{
					label: "Publicar",
					icon: "fa fa-paper-plane",
					command: () => nav.goSetupPublish(),
				},
			],
		},
		{
			label: "Apostas",
			icon: "fa fa-clipboard-list",
			items: [
				{
					label: "Listas",
					icon: "fa fa-clipboard-list",
					command: () => nav.lists(),
				},
				{
					label: "Ranking",
					icon: "fa fa-medal",
					command: () => nav.ranking(),
				},
				{
					label: "Gerar Ranking",
					icon: "fas fa-sort-amount-down-alt",
					command: () => nav.rankingGenerate(),
				},
			],
		},
		{
			label: "Presuntos",
			icon: "fa fa-skull-crossbones",
			items: [
				{
					label: "Buscar Apostas",
					icon: "fa fa-search",
					command: () => nav.searchBets(),
				},
				{
					label: "Enterrar",
					icon: "fa fa-cross",
					command: () => nav.deathNew(),
				},
				{
					label: "IML",
					icon: "fa fa-book-dead",
					command: () => nav.deaths(),
				},
			],
		},
		{
			label: "Medias",
			icon: "fa fa-photo-video",
			items: [
				{
					label: "Images",
					icon: "fa fa-images",
					command: () => nav.goMedia(),
				},
				{
					label: "Upload",
					icon: "fa fa-upload",
					command: () => nav.goUpload(),
				}

			],
		},

		// {
		// 	label: "Manual do coveiro",
		// 	icon: "fa fa-book",
		// }
	];
}

export const userMenuBuilder = async (
	nav: NavigationService,
	auth: AuthService,
): Promise<MenuItem[]> => {

	let menu: MenuItem[] = [];
	const isAdmin: boolean = await auth.isAdmin();
	if (isAdmin) {
		menu.push({
			label: "Admin",
			icon: "fa fa-users",
			items: [
				{
					label: "Gerenciar Usuários",
					icon: "fa fa-id-card",
					command: () => nav.goAdminUsers(),
				},
				{
					label: "Logs",
					icon: "fa fa-bug",
					command: () => nav.goLogs(),
				},
				{
					label: "Dev",
					icon: "fa fa-terminal",
					command: () => nav.goDev(),
				}
			],
		});
	}
		menu.push({
			label: "User",
			icon: "fa fa-user-circle",
			items: [
				// {
				// 	label: "My Account",
				// 	icon: "fa fa-user",
				// 	command: () => this.nav.myAccount(),
				// },
				{
					label: "Logout",
					icon: "fa fa-power-off",
					command: () => auth.logout(),
				}
			],
			expanded: false,
		});

	return menu;

}
