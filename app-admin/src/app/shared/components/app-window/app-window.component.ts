import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PlatypusLoaderComponent } from '../platypus-loader/platypus-loader.component';
import { PanelModule } from 'primeng/panel';
import { FontAwesomeSharedModule } from '@app/shared/font-awesome.module';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * `AppWindowComponent` is a reusable UI component that acts as a window or panel.
 * It can be used to display content in a structured and visually distinct container.
 * It supports features like titles, icons, loading states, and can be configured
 * to be collapsable, closable, and refreshable.
 *
 * @example
 * <app-window
 *   title="My Window"
 *   [icon]="['fas', 'star']"
 *   [loading]="isLoading"
 *   (onClose)="handleClose()">
 *   <!-- Content goes here -->
 * </app-window>
 */
@Component({
	selector: 'app-window',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports: [
		CommonModule,
		PanelModule,
		PlatypusLoaderComponent,
		FontAwesomeSharedModule,
	],
	templateUrl: './app-window.component.html',
	styleUrl: './app-window.component.scss',
})
export class AppWindowComponent {
	/**
	 * The title to be displayed in the window's header.
	 */
	@Input() title: string = "";
	/**
	 * The icon class (e.g., from Font Awesome) to be displayed next to the title.
	 */
	@Input() icon: IconProp|undefined = undefined;
	/**
	 * If true, the window behaves like a modal. The `close()` method's behavior
	 * might change based on this.
	 */
	@Input() modal: boolean = false;

	/**
	 * If true, a refresh button is shown in the header.
	 */
	@Input() showRefresh: boolean = false;
	/**
	 * If true, a close button is shown in the header.
	 */
	@Input() showClose: boolean = true;
	/**
	 * If true, the window's content can be collapsed and expanded.
	 */
	@Input() collapsable: boolean = true;
	/**
	 * If true, a loading indicator is displayed over the window's content.
	 */
	@Input() loading: boolean = false;
	/**
	 * If true, the entire window is hidden.
	 */
	@Input() hidden: boolean = false;
	/**
	 * If true, the window's content area is collapsed.
	 */
	@Input() hideContent: boolean = false;

	/**
	 * Emits when the close button is clicked.
	 */
	@Output() onClose = new EventEmitter<any>();
	/**
	 * Emits when the refresh button is clicked.
	 */
	@Output() onRefresh = new EventEmitter<void>();

	constructor(
	) {
	}

	/**
	 * Expands the content area of the window.
	 */
	public expand = () => this.hideContent = false;
	/**
	 * Collapses the content area of the window.
	 */
	public collapse = () => this.hideContent = true;

	/**
	 * Shows the window by setting `hidden` to false.
	 */
	public open() {
		this.hidden = false;
	}

	/**
	 * Closes or hides the window.
	 * If the window is not a modal, it sets `hidden` to true.
	 * Emits the `onClose` event.
	 */
	public close() {
		console.log("close panel");
		if (this.modal) {
			// Modal closing logic can be implemented here.
		} else {
			this.hidden = true;
		}
		this.onClose.emit(true);
	}
}
