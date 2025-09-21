import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/authentication.service';
import { Store } from '@app/services/store/store.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-token',
	standalone: true,
	imports: [ SharedModule, ],
	providers: [ AuthService ],
	templateUrl: './token.component.html',
	styleUrl: './token.component.scss'
})
export class TokenComponent implements OnInit {
	public loading: boolean = false;
	public data: any;
	public token: string = "";

	constructor(
		private store: Store,
		private auth: AuthService,
		private toaster: Toaster,
	) { }

	ngOnInit(): void {
		this.loading = true;
		this.GetToken();
	}

	public async GetToken() {
		this.token = await this.store.getToken();
		this.auth.getTokenData(this.token)
			.subscribe({
				next: (rs) => {
					this.data = rs;
					this.loading = false;
				},
				error: (err) => {
					console.error(err);
					this.data = err;
					this.loading = false;
				},
			});
	}

}
