import { computed, effect, EventEmitter, Injectable, Signal, signal } from '@angular/core';
import { AppState } from '@app/app.state';
import { Subject } from 'rxjs';

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

	public _config: LayoutConfig = {
		preset: 'Aura',
		primary: 'emerald',
		surface: null,
		darkTheme: false,
		menuMode: 'static'
	};

	constructor() {
		this.menuMode = this.isDesktop() ? 'static' : 'hide';
		// effect(() => {
		// 	const config = this.layoutConfig();
		// 	if (config) {
		// 		this.onConfigUpdate();
		// 	}
		// });
		// effect(() => {
		// 	const config = this.layoutConfig();
		// 	if (!this.initialized || !config) {
		// 		this.initialized = true;
		// 		return;
		// 	}
		// 	this.handleDarkModeTransition(config);
		// });
	}

	// layoutConfig = signal<layoutConfig>(this._config);
	// public menuMode: Signal<menuMode> = computed(() => this.layoutConfig().menuMode);

	// private configUpdate = new Subject<layoutConfig>();
	// configUpdate$ = this.configUpdate.asObservable();

	// theme = computed(() => (this.layoutConfig()?.darkTheme ? 'light' : 'dark'));
	// isDarkTheme = computed(() => this.layoutConfig().darkTheme);
	// public onConfigUpdate() {
	// 	this._config = { ...this.layoutConfig() };
	// 	this.configUpdate.next(this.layoutConfig());
	// }

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
		console.log("toggling menu", this.menuMode);
	}

	public toggleDarkMode() {
		this.isDarkTheme = !this.isDarkTheme;
		if (this.isDarkTheme) {
			document.documentElement.classList.add('app-dark');
		} else {
			document.documentElement.classList.remove('app-dark');
		}
	}

	// transitionComplete = signal<boolean>(false);
	// private onTransitionEnd() {
	// 	this.transitionComplete.set(true);
	// 	setTimeout(() => {
	// 		this.transitionComplete.set(false);
	// 	});
	// }
	// private startViewTransition(config: layoutConfig): void {
	// 	const transition = (document as any).startViewTransition(() => {
	// 		this.toggleDarkMode(config);
	// 	});
	// 	transition.ready
	// 		.then(() => {
	// 			this.onTransitionEnd();
	// 		})
	// 		.catch(() => { });
	// }

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
