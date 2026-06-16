import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/authentication.service';
import { Store } from '@app/services/store/store.service';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-token',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './token.component.html',
	styleUrl: './token.component.scss'
})
export class TokenComponent implements OnInit {
	public loading: boolean = false;
	public data: any;

	constructor(
		private store: Store,
		private auth: AuthService,
	) { }

	ngOnInit(): void {
		this.loading = true;
		this.GetToken();
	}

	public async GetToken() {
		let token: string = await this.store.getToken();
		this.auth.getTokenData(token)
			.subscribe((rs) => {
				this.data = rs;
				this.loading = false;
			});
	}

}
