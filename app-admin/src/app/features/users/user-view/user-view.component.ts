import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { SharedModule } from '@app/shared/shared.module';
import { UsersApi } from '../users.api';
import { iUser } from '../user.interface';
import { Toaster } from '@app/services/toaster/toaster.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListViewComponent } from '../user-list-view/user-list-view.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
		SharedModule,
		UserListViewComponent,
		DatePipe,
	],
	providers: [
		UsersService,
		UsersApi,
	],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent implements OnInit {
	public loading:boolean = false;
	public userId!: number;
	public user?: iUser;

	constructor (
		public ref: DynamicDialogRef,
		public config: DynamicDialogConfig,
		private service: UsersService,
		private toast: Toaster,
	) {
		const dialogData = this.config.data;
		this.userId = +dialogData.id;
	}

	ngOnInit(): void {
		console.info("getting user ", this.userId);
		this.loadUser();
	}

	public deleteUser() {
		this.service.deleteUser(this.userId)
			.subscribe({
				next: (rs) => {
					console.info("deleted list: ", rs);
					this.toast.success(`Lista ${this.user?.email} excluída`);
					this.ref.close();
				},
				error: (err) => console.error(err),
			})
	}

	private loadUser() {
		this.loading = true;
		this.service.getUser(this.userId)
			.subscribe({
				next: (rs) => {
					this.loading = false;
					console.info("user: ", rs);
					this.user = rs;
				},
				error: (err) => {
					console.error(err);
					this.toast.error(err);
				}
			})
	}

}
