import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/services/layout/layout.service';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	public title: string = environment.title;
	public showBars: boolean = false;
	constructor(
		private layout: LayoutService,
	) { }

	ngOnInit(): void {
		this.showBars = this.layout.isMobile();
	}

	public showMenu() {
		this.layout.showMenu();
	}
}
