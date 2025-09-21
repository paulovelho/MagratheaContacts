import { Component, OnInit } from '@angular/core';
import { Store } from '@app/services/store/store.service';
import { SharedModule } from '@app/shared/shared.module';
import { stringify } from 'querystring';
import { StoreCardComponent } from '../store-card/store-card.component';

@Component({
  selector: 'app-dev-store',
  standalone: true,
  imports: [ SharedModule, StoreCardComponent ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {

	public loading: boolean = false;
	public token: string = "...";
	public user: any = "...";

	public shelves: string[] = [];
	public values: any = {};

	constructor(
		private Store: Store,
	) {
	}

	ngOnInit(): void {
		this.loading = true;
		Promise.all([
			this.loadUser(),
			this.loadShelf(),
		]).then(() => this.loading = false);
	}

	private loadToken() {
		return this.Store.getToken()
			.then((t) => this.token = t);
	}

	private loadUser() {
		return this.Store.getLoggedUser()
			.then((u) => {
				this.user = u;
			});
	}

	public loadShelf() {
		this.getAllKeys();
		this.shelves
		.forEach(item => {
			this.Store.get(item)
				.then(rs => this.values[item] = rs);
		});
	}

	public getAllKeys() {
		let keys = this.Store.getAllKeys();
		this.shelves = keys
			.filter((k:any) => 
				k != "token" &&
				k != "google-user" &&
				k != "user"
			);
	}

}
