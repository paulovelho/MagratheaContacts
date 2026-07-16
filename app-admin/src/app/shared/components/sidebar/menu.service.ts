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
						label: "API Info",
						icon: "book",
						command: () => nav.goInfo(),
					},
					{
						label: "Settings",
						icon: "cog",
						command: () => {},
					},
					{
						label: "Publish",
						icon: "rocket",
						badge: 'soon',
						command: () => {},
					},
					{
						label: "Version",
						icon: "certificate",
						command: () => nav.goVersion(),
					},
				],
			},
			{
				label: "E-mails",
				icon: "mail-bulk",
				items: [
					{
						label: "Mail Manager",
						icon: "inbox",
						command: () => nav.goEmails(),
					},
					{
						label: "Send Test E-mail",
						icon: "paper-plane",
						command: () => nav.goEmailTest(),
					},
					{
						label: "Process Next",
						icon: "play",
						command: () => nav.goEmailProcess(),
					},
				],
			},
			{
				label: "Templates",
				icon: "file-code",
				items: [
					{
						label: "Templates",
						icon: "file-code",
						command: () => nav.goTemplates(),
					},
					{
						label: "Mail Promises",
						icon: "hourglass-half",
						command: () => nav.goPromises(),
					},
					{
						label: "Create Mail Promise",
						icon: "plus-circle",
						command: () => nav.goPromiseCreate(),
					},
					{
						label: "Template Guide",
						icon: "book-open",
						command: () => nav.goTemplateGuide(),
					},
				],
			},
			{
				label: "Manager",
				icon: "cogs",
				items: [
					{
						label: "Keys",
						icon: "key",
						command: () => nav.goKeys(),
					},
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

		];
	}

	public static rightMenuBuider = async (
		nav: NavigationService,
	): Promise<MenuItem[]> => {
		return [
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
				],
			},
			{
				label: "About the App",
				items: [
					{
						label: "API Info",
						icon: "book",
						command: () => nav.goInfo(),
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
