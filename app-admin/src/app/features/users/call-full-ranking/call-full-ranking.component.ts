import { Component } from '@angular/core';
import { Toaster } from '@app/services/toaster/toaster.service';
import { SharedModule } from '@app/shared/shared.module';
import { UsersService } from '../users.service';
import { environment } from '@environments/environment';

@Component({
	selector: 'app-call-full-ranking',
	standalone: true,
	imports: [
		SharedModule,
	],
	templateUrl: './call-full-ranking.component.html',
	styleUrl: './call-full-ranking.component.scss'
})
export class CallFullRankingComponent {
	public loading:boolean = false;
	public rs?: any;
	public apiURL: string = "";

	constructor (
		private toast: Toaster,
		private service: UsersService,
	) {
		this.apiURL = environment.api + "/ranking/full";
	}

	public generate() {
		this.loading = true;
		this.service.cacheRanking()
			.subscribe({
				next: (rs: any) => {
					this.rs = rs;
					this.toast.success("Ranking Cached!");
					this.loading = false;
				},
				error: (err) => {
					this.toast.error(err);
					this.loading = false;
				}
			});
	}

}
