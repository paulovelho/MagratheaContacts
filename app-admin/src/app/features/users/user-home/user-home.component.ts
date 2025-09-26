import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { UsersService } from '../users.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { iUser } from '../user.interface';
import { UserTableComponent } from '../user-table/user-table.component';
import { UsersApi } from '../users.api';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    SharedModule,
    UserTableComponent
	],
	providers: [
		UsersService,
		UsersApi,
	],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit {
	public loading:boolean = false;
	public lists: iUser[] = [];
	public years: any[] = [];
	public year?: any;

	constructor(
		private service: UsersService,
		private toast: Toaster,
		private settings: SettingsService,
	) { }

	ngOnInit(): void {
		this.loadYears();
		this.loadLists();
	}

	private async loadYears() {
		const yearC = await this.settings.getCurrentYear();
		const yearS = await this.settings.getSubscriptionYear();
		if(yearC != yearS) {
			this.year = { id: yearC, name: yearC };
			this.years.push( this.year, { id: yearS, name: yearS } );
		}
		return true;
	}

	public loadLists() {
		this.loading = true;
		if(this.year) {
			this.loadListsByYear(this.year.id);
		} else {
			this.loadListsGeneral();
		}
	}

	private loadListsByYear(y:number) {
		this.service.getListsByYear(y)
			.subscribe({
				next: (lists) => {
					this.lists = lists;
					this.loading = false;
				},
				error: (err) => {
					console.error(err);
					this.toast.error(err);
					this.loading = false;
				}
			});
	}

	private loadListsGeneral() {
		this.service.getLists()
			.subscribe({
				next: (lists) => {
					this.lists = lists;
					this.loading = false;
				},
				error: (err) => {
					console.error(err);
					this.toast.error(err);
					this.loading = false;
				}
			});
	}
}
