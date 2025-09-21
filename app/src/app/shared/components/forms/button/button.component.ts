import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { PlatypusLoaderComponent } from '../../platypus-loader/platypus-loader.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	imports:[
		ButtonModule,
		CommonModule,
		PlatypusLoaderComponent,
	],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit { 

	@Input() type:
		"success"|"info"|"warning"|"danger"|"help"|
		"primary"|"secondary"|"contrast"|
		"save"|"cancel"|"delete"|"search"|
		null|undefined = null;
	@Input() caption: string | null = null;
	@Input() subcaption: string | null = null;
	@Input() icon: string = "";
	@Input() raised: boolean = true;
	@Input() rounded: boolean = false;
	@Input() outlined: boolean = false;
	@Input() disabled: boolean = false;
	@Input() extraClass: any;
	@Input() loading: boolean = false;
	@Output() action = new EventEmitter<any>();

	public btclass: string[] = [];
	public loadingClass: string = "";
	public severity: "success" | "info" | "warning" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined = null;

	constructor() {}

	ngOnInit() {
		this.Initialize();
	}

	private Initialize(): void {
		this.applyCustomClass();
		this.preFab();
	}

	private preFab(): void {
		switch (this.type) {
			case "save":
				this.severity = "success";
				this.icon = 'fa-save';
				this.caption = this.rounded ? null : 'Salvar';
				break;
			case "delete":
				this.severity = "danger"
				this.icon = 'fa-trash';
				this.caption = this.rounded ? null : 'Delete';
				break;
			case "cancel":
				this.severity = "danger";
				this.icon = 'fa-times-circle';
				this.caption = this.rounded ? null : 'Cancelar';
				break;
			case "search":
				this.severity = "primary";
				this.icon = 'fa-search';
				this.caption = this.rounded ? null : 'buscar';
				break;

			// styles:
			default:
				this.severity = this.type;
				break;
		}
	}

	private applyCustomClass(): void {
		if(this.extraClass) {
			this.btclass = [].concat( this.extraClass );
		}
	}

	public doAction(): void {
		this.action.emit();
	}

}
