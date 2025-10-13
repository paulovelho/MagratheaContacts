import { AuthService } from "@app/services/auth/authentication.service";
import { NavigationService } from "@app/services/navigation/navigation.service";
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
					icon: "cog",
					command: () => nav.goSetupConfig(),
				},
				{
					label: "Publicar",
					icon: "paper-plane",
					command: () => nav.goSetupPublish(),
				},
			],
		},
		{
			label: "Medias",
			icon: "photoVideo",
			items: [
				{
					label: "Images",
					icon: "images",
					command: () => nav.goMedia(),
				},
				{
					label: "Upload",
					icon: "upload",
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
			icon: "users",
			items: [
				{
					label: "Gerenciar Usuários",
					icon: "id-card",
					command: () => nav.goAdminUsers(),
				},
				{
					label: "Logs",
					icon: "bug",
					command: () => nav.goLogs(),
				},
				{
					label: "Dev",
					icon: "terminal",
					command: () => nav.goDev(),
				}
			],
		});
	}
		menu.push({
			label: "User",
			icon: "user-circle",
			items: [
				// {
				// 	label: "My Account",
				// 	icon: "fa fa-user",
				// 	command: () => this.nav.myAccount(),
				// },
				{
					label: "Logout",
					icon: "power-off",
					command: () => auth.logout(),
				}
			],
			expanded: false,
		});

	return menu;

}
