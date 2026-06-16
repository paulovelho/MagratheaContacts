import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { MenuComponent } from './menu.component';
import { LayoutService } from '@app/services/layout/layout.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		MenuComponent,
	],
	styleUrl: 'sidebar.component.scss',
	template: `<div class="layout-sidebar"
		[ngClass]="{
			'only-icons': layoutService.menuMode == 'icons',
			'overlay': layoutService.menuMode == 'overlay', 
			'hide': layoutService.menuMode == 'hide', 
		} ">
			<app-menu/>
		</div>`,
})
export class SidebarComponent implements OnInit {
	constructor(
		public cdr: ChangeDetectorRef,
		public layoutService: LayoutService,
	) { }

	ngOnInit(): void {
		this.layoutService.menuModeChange.subscribe((mode) => {
			this.cdr.markForCheck();
		});
	}
}
