import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly mobileWidth = 750;
	private platformId;

	constructor(@Inject(PLATFORM_ID) private platId: Object) {
		this.platformId = platId;
	}

	public isBrowser = () => isPlatformBrowser(this.platformId);
	public mobileOn(width?: number): boolean {
		if(!width) width = window.innerWidth;
		if(this.isBrowser()) {
			return (width <= this.mobileWidth);
		} else return true;
	}
}
