import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { AppService } from '@app/services/app.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [
		ParallaxStandaloneDirective,
		CommonModule,
		HeaderMenuComponent,
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	private readonly hostClass = 'main-nav dark stick-fixed';
	private isBrowser: boolean;
	public mobileOn: boolean;
	public showMenu: boolean;

	@HostBinding('class') elementClass = this.hostClass;

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private renderer: Renderer2,
		private router: Router,
		private appService: AppService,
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
		this.mobileOn = this.appService.mobileOn();
		this.showMenu = !this.mobileOn;
		this.hideMenuOnPageChange();
	}

	ngOnInit() {
		if (this.isBrowser) {
			this.updateClass(window.innerWidth);
		}
	}

	private hideMenuOnPageChange() {
		this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
				if(this.mobileOn) this.showMenu = false;
			}
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		if (this.isBrowser) {
			const width = (event.target as Window).innerWidth;
			this.updateClass(width);
		}
	}

	private updateClass(width: number) {
		if(this.appService.mobileOn(width)) {
			this.elementClass = this.hostClass + ' mobile-on';
		} else {
			this.elementClass = this.hostClass;
		}
	}
	currentSection: string = 'home';

	scrollToSection(section: string) {
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			this.currentSection = section;
		}
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		// Adjust the scroll threshold and class names as needed
		if (offset > 100) {
			// this.renderer.removeClass(document.querySelector('nav'), 'transparent');
			// this.renderer.removeClass(document.querySelector('nav'), 'js-transparent');
			this.renderer.addClass(document.querySelector('nav'), 'small-height');
		} else {
			// this.renderer.addClass(document.querySelector('nav'), 'transparent');
			// this.renderer.addClass(document.querySelector('nav'), 'js-transparent');
			this.renderer.removeClass(document.querySelector('nav'), 'small-height');
		}
	}

	public toggleMenu = () => this.showMenu = !this.showMenu;

}
