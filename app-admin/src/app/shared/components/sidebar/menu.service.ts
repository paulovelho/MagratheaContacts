import { Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth/authentication.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	constructor(
		// private nav: NavigationService,
		// private auth: AuthService,
	) { }

	public static menuBuilder = async (
		nav: NavigationService,
	): Promise<MenuItem[]> => {

		return [
			{
				label: "Setup",
				icon: "cogs",
				items: [
					{
						label: "Configurações",
						icon: "cog",
						command: () => {},
					},
					{
						label: "Publicar",
						icon: "paper-plane",
						badge: 'soon',
						command: () => {},
					},
				],
			},
			{
				label: "Manager",
				icon: "cogs",
				items: [
					{
						label: "Source",
						icon: "store",
						command: () => nav.goSource(),
					},
					{
						label: "SMTP",
						icon: "server",
						command: () => nav.goSmtp(),
					},
				],
			},

			{
				label: "Admin",
				icon: "users",
				items: [
					{
						label: "Users",
						icon: "id-card",
						badge: 'soon',
						command: () => {},
					},
					{
						label: "Logs",
						icon: "bug",
						badge: 'soon',
						command: () => {},
					},
					{
						label: "Dev",
						icon: "terminal",
						command: () => nav.goDev(),
					},
					{
						label: "Version",
						icon: "certificate",
						command: () => nav.goVersion(),
					},
				],
			}

		];
	}

	public static userMenuBuilder = async (
		nav: NavigationService,
		auth: AuthService,
	): Promise<MenuItem[]> => {

		let menu: MenuItem[] = [];
		menu.push({
			label: "User",
			icon: "user-circle",
			items: [
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
}
