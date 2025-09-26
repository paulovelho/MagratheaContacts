import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-list-view',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
		SharedModule,
		TableModule,
	],
  templateUrl: './user-list-view.component.html',
  styleUrl: './user-list-view.component.scss'
})
export class UserListViewComponent {
	@Input() bets:any;
	// bets: name, points, death_id
	
	constructor () {
		console.info("bets", this.bets);
	}

}
