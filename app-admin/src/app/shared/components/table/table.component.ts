import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-table',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [ SharedModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {

	///	this.keys = ["id", "title", "description"];
	/// this.titles["id"] = "#ID";
	/// this.titles["title"] = "Nome";
	/// this.titles["description"] = this.transloco.translate("description");

	@Input() items: any[] = [];
	@Input() titles: any[] = [];
	@Input() keys: any[] = [];
	@Input() extraClass: string = "";
	@Output() rowClick = new EventEmitter<any>();

	public bodyClass: string = "";
	public classes: string = "";

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if(!changes['columns']) {
			this.loadColumns();
		}
		this.initialize();
	}

	private initialize() {
		this.classes = this.extraClass;
		if(this.rowClick.observed) {
			this.classes += "table-hover";
		}
	}

	private loadColumns() {
		let item = this.items[0];
		if(item == null) return;
		if(this.keys.length == 0) {
			this.keys = Object.keys(item);
		}
	}

	public onRowClick(item: any) {
		if(this.rowClick.observed) {
			this.rowClick.emit(item);
		}
	}

}
