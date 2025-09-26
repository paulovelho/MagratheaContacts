import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { UsersService } from '../users.service';
import { UsersApi } from '../users.api';
import { UsersViewerService } from '../users-viewer.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { iRanking } from '../ranking.interface';
import { UserRankingTableComponent } from "../user-ranking-table/user-ranking-table.component";

@Component({
  selector: 'app-user-ranking',
  standalone: true,
  imports: [
    SharedModule,
    UserRankingTableComponent,
],
	providers: [
		UsersService,
		UsersApi,
		UsersViewerService,
	],
  templateUrl: './user-ranking.component.html',
  styleUrl: './user-ranking.component.scss'
})
export class UserRankingComponent implements OnInit {
	public loading: boolean = false;
	public list: iRanking[] = [];

	constructor(
		private toast: Toaster,
		private service: UsersService,
	) { }

	ngOnInit(): void {
		this.loadRanking();
	}

	public loadRanking() {
		this.loading = true;
		this.service.getRanking()
			.subscribe({
				next: (rs) => {
					this.list = rs;
					this.loading = false;
				},
				error: (err) => {
					this.toast.error(err);
					this.loading = false;
				},
			})
	}

}
