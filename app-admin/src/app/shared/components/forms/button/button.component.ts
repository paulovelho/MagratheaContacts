import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { FontAwesomeSharedModule } from '@app/shared/font-awesome.module';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

/**
 * A configurable button component with pre-defined styles and behaviors.
 * It can be used for common actions like 'save', 'delete', 'cancel', etc.,
 * or styled as a primary, success, or danger button.
 *
 * @example
 * <app-button type="save" (action)="onSave()"></app-button>
 * <app-button type="primary" caption="Click Me" icon="fa-star" (action)="onClick()"></app-button>
 * <app-button [loading]="isLoading" (action)="onLoad()"></app-button>
 */
@Component({
	selector: 'app-button',
	standalone: true,
	imports:[
		ButtonModule,
		CommonModule,
		FontAwesomeSharedModule,
	],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit { 

	/**
	 * Pre-defined button type that determines its style and default caption/icon.
	 */
	@Input() type: "save"|"delete"|"cancel"|"load-more"|"search"|"primary"|"primary-outline"|"success"|"danger"|null = null;
	/**
	 * The text to display on the button. Overrides default captions from `type`.
	 */
	@Input() caption: string | null = null;
	/**
	 * Additional smaller text to display below the main caption.
	 */
	@Input() subcaption: string | null = null;
	/**
	 * The icon to display on the button (e.g., a Font Awesome class). Overrides default icons from `type`.
	 */
	@Input() icon: string = "";
	/**
	 * Custom CSS class or an array of classes to apply to the button for additional styling.
	 */
	@Input() extraClass: any;
	@Input() severity?: ButtonSeverity | null = null;
	/**
	 * If true, the button will be in a loading state, typically showing a spinner.
	 */
	@Input() loading: boolean = false;
	/**
	 * Emits an event when the button is clicked.
	 */
	@Output() action = new EventEmitter<any>();


	/**
	 * An array of CSS classes to be applied to the button element.
	 */
	public btclass: string[] = [];
	/**
	 * CSS class specifically for the loading state.
	 */
	public loadingClass: string = "";

	constructor() {}

	ngOnInit() {
		this.Initialize();
	}

	/**
	 * Initializes the button's classes and pre-fabricated settings.
	 */
	private Initialize(): void {
		this.applyCustomClass();
		this.preFab();
	}

	/**
	 * Applies pre-defined styles, icons, and captions based on the `type` input.
	 */
	private preFab(): void {
		switch (this.type) {
			case "save":
				this.btclass.push('btn-success');
				this.icon = 'save';
				this.severity = "success";
				this.caption = 'Salvar';
				break;
			case "delete":
					this.btclass.push('btn-danger');
					this.icon = 'trash';
					this.severity = "danger";
					this.caption = 'Delete';
					break;
			case "cancel":
				this.btclass.push('btn-danger');
				this.icon = 'times-circle';
				this.severity = "warn";
				this.caption = 'Cancelar';
				break;
			case "load-more":
				this.icon = 'plus-square';
				this.btclass.push('btn-primary');
				this.severity = "primary";
				this.caption = 'Carregar mais...';
				break;
			case "search":
				this.icon = 'search';
				this.btclass.push('btn-secondary','btn-rounded');
				this.caption = 'buscar';
				break;

			// styles:
			case "primary":
				this.severity = "primary";
				break;
			case "primary-outline":
				this.severity = "primary";
				this.btclass.push('btn-outline-primary');
				this.loadingClass = "";
				break;
			case "success":
				this.severity = "success";
				this.btclass.push('btn-outline-success');
				break;
			case "danger":
				this.severity = "danger";
				this.btclass.push('btn-outline-danger');
				break;
			default:
				this.severity = "secondary";
				this.btclass.push('btn-outline-secondary');
				break;
		}
	}

	/**
	 * Applies any custom classes passed via the `extraClass` input.
	 */
	private applyCustomClass(): void {
		if(this.extraClass) {
			this.btclass = [].concat( this.extraClass );
		}
	}

	/**
	 * Emits the `action` event when the button is clicked.
	 */
	public doAction(): void {
		this.action.emit();
	}

}
