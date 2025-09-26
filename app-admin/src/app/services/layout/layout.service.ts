import { EventEmitter, Injectable } from '@angular/core';
import { AppState } from '@app/app.state';

@Injectable({
	providedIn: 'root'
})
export class LayoutService {

	public menuDisplayed: boolean = false;

	constructor(
		private state: AppState
	) { }

	private Initialize() {
		this.state.createState("show-menu", this.showMenu);
	}

	isMobile = () => window.innerWidth < 640;
	isDesktop = () => window.innerWidth > 1024;
	isTablet = () => {
		const width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	public showMenu() { this.state.emit("show-menu", true); }
	public menuSubscribe(): EventEmitter<any> { return this.state.getEvent("show-menu"); }

}
