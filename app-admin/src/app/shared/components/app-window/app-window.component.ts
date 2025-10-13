import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PlatypusLoaderComponent } from '../platypus-loader/platypus-loader.component';
import { PanelModule } from 'primeng/panel';

@Component({
	selector: 'app-window',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [
		CommonModule,
		PanelModule,
		PlatypusLoaderComponent,
	],
	templateUrl: './app-window.component.html',
	styleUrl: './app-window.component.scss',
})
export class AppWindowComponent {
	@Input() title: string = "";
	@Input() icon: string = "";
	@Input() modal: boolean = false;

	@Input() showRefresh: boolean = false;
	@Input() showClose: boolean = true;
	@Input() collapsable: boolean = true;
	@Input() loading: boolean = false;
	@Input() hidden: boolean = false;
	@Input() hideContent: boolean = false;

	@Output() onClose = new EventEmitter<any>();
	@Output() onRefresh = new EventEmitter<void>();

	constructor(
	) {
	}

	public expand = () => this.hideContent = false;
	public collapse = () => this.hideContent = true;

	public open() {
		this.hidden = false;
	}

	public close() {
		if (this.modal) {
		} else {
			this.hidden = true;
		}
		this.onClose.emit(true);
	}
}
