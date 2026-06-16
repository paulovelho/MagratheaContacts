import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { MenuComponent } from './menu.component';
import { LayoutService } from '@app/services/layout/layout.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-drawer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		MenuComponent,
	],
	styleUrl: 'sidebar.component.scss',
	template: `<div class="layout-sidebar drawer overlay">
			<app-menu type="right"/>
		</div>`,
})
export class DrawerComponent implements OnInit {
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
