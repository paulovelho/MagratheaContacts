import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-button',
	standalone: true,
	imports:[
		ButtonModule,
		CommonModule,
	],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit { 

	@Input() type: "save"|"delete"|"cancel"|"load-more"|"search"|"primary"|"primary-outline"|"success"|"danger"|null = null;
	@Input() caption: string | null = null;
	@Input() subcaption: string | null = null;
	@Input() icon: string = "";
	@Input() extraClass: any;
	@Input() loading: boolean = false;
	@Output() action = new EventEmitter<any>();

	public btclass: string[] = [];
	public loadingClass: string = "";

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
				this.btclass.push('btn-success');
				this.icon = 'fa-save';
				this.caption = 'Salvar';
				break;
			case "delete":
					this.btclass.push('btn-danger');
					this.icon = 'fa-trash';
					this.caption = 'Delete';
					break;
			case "cancel":
				this.btclass.push('btn-danger');
				this.icon = 'fa-times-circle';
				this.caption = 'Cancelar';
				break;
			case "load-more":
				this.icon = 'fa-plus-square';
				this.btclass.push('btn-primary');
				this.caption = 'Carregar mais...';
				break;
			case "search":
				this.icon = 'fa-search';
				this.btclass.push('btn-secondary','btn-rounded');
				this.caption = 'buscar';
				break;

			// styles:
			case "primary":
				this.btclass.push('btn-primary');
				break;
			case "primary-outline":
				this.btclass.push('btn-outline-primary');
				this.loadingClass = "";
				break;
			case "success":
				this.btclass.push('btn-outline-success');
				break;
			case "danger":
				this.btclass.push('btn-outline-danger');
				break;
			default:
				this.btclass.push('btn-outline-secondary');
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
