import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
	@Input() item!: any;
  isSubMenuOpen: boolean = false;

  onMouseEnter() {
    this.openMenu();
  }

  onMouseLeave() {
    this.closeMenu();
  }

	openMenu() {
		this.isSubMenuOpen = true;
	}
	closeMenu() {
		this.isSubMenuOpen = false;
	}
	toggleMenu() {
		this.isSubMenuOpen = !this.isSubMenuOpen;
	}
}
