import { computed, effect, EventEmitter, Injectable, Signal, signal } from '@angular/core';
import { AppState } from '@app/app.state';
import { Subject } from 'rxjs';
import { Store } from '../store/store.service';

export type MenuMode = "icons" | "static" | "hide" | "overlay";
export interface LayoutConfig {
	preset?: string;
	primary?: string;
	surface?: string | undefined | null;
	darkTheme?: boolean;
	menuMode: MenuMode;
}

@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	public menuMode: MenuMode;
	public menuModeChange: EventEmitter<MenuMode> = new EventEmitter<MenuMode>();
	public isDarkTheme: boolean = false;
	public showDrawer: boolean = false;
	public showDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public _config: LayoutConfig = {
		preset: 'Aura',
		primary: 'emerald',
		surface: null,
		darkTheme: false,
		menuMode: 'static'
	};

	constructor(
		private store: Store,
	) {
		this.menuMode = this.isDesktop() ? 'static' : 'hide';
		this.store.get("dark-theme").then((d) => {
			this.isDarkTheme = !!d;
			this.updateDarkTheme();
		});
	}

	isMobile = () => window.innerWidth < 640;
	isDesktop = () => window.innerWidth > 1024;
	isTablet = () => {
		const width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	public menuToggle() {
		if(this.isDesktop()) {
			this.menuMode = this.menuMode == "static" ? "icons" : "static";
		} else {
			this.menuMode = this.menuMode == "overlay" ? "hide" : "overlay";
		}
		this.menuModeChange.emit(this.menuMode);
		// console.log("toggling menu", this.menuMode);
	}

	public drawerToggle() {
		this.showDrawer = !this.showDrawer;
		this.showDrawerChange.emit(this.showDrawer);
		// console.log("show drawer", this.showDrawer);
	}

	public toggleDarkMode() {
		this.isDarkTheme = !this.isDarkTheme;
		this.store.set("dark-theme", this.isDarkTheme);
		this.updateDarkTheme();
	}

	private updateDarkTheme() {
		console.info("is darke theme: ", this.isDarkTheme);
		if (!!this.isDarkTheme) {
			console.info("adding dark attribute");
			document.documentElement.classList.add('app-dark');
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			document.documentElement.classList.remove('app-dark');
			document.documentElement.removeAttribute("data-theme");
		}
	}

	// private handleDarkModeTransition(config: layoutConfig): void {
	// 	if ((document as any).startViewTransition) {
	// 		this.startViewTransition(config);
	// 	} else {
	// 		this.toggleDarkMode(config);
	// 		this.onTransitionEnd();
	// 	}
	// }
	// public toggleDarkMode(config?: layoutConfig): void {
	// 	const _config = config || this.layoutConfig();
	// 	if (_config.darkTheme) {
	// 		document.documentElement.classList.add('app-dark');
	// 	} else {
	// 		document.documentElement.classList.remove('app-dark');
	// 	}
	// }



}
