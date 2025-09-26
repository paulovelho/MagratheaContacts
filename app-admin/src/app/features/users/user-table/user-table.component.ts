import { Component, Input, ViewEncapsulation } from '@angular/core';
import { iUser } from '../user.interface';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { iBet } from '@app/features/bets/bet.interface';
import { UsersViewerService } from '../users-viewer.service';

@Component({
  selector: 'app-user-table',
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
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
	@Input() data: iUser[] = [];

	constructor(
		private viewService: UsersViewerService,
	) {}

	public viewUser(u:iUser) {
		this.viewService.viewUser(u.id);
	}

	
}
