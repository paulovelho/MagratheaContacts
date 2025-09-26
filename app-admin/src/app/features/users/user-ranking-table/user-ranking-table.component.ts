import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UsersViewerService } from '../users-viewer.service';
import { iRanking } from '../ranking.interface';

@Component({
  selector: 'app-user-ranking-table',
	encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
		SharedModule,
		ButtonModule,
		TableModule,
	],
	providers: [
		UsersViewerService,
	],
  templateUrl: './user-ranking-table.component.html',
  styleUrl: './user-ranking-table.component.scss'
})
export class UserRankingTableComponent {
	@Input() data: iRanking[] = [];

	constructor(
		private viewService: UsersViewerService,
	) {}

	public viewUser(u:any) {
		let user_id = u.id;
		this.viewService.viewUser(user_id);
	}

}
