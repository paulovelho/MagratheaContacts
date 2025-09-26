import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { UsersService } from '../users.service';
import { UsersApi } from '../users.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { CallFullRankingComponent } from "../call-full-ranking/call-full-ranking.component";

@Component({
  selector: 'app-ranking-generation',
  standalone: true,
  imports: [
    SharedModule,
    CallFullRankingComponent
],
	providers: [
		UsersService,
		UsersApi,
	],
  templateUrl: './ranking-generation.component.html',
  styleUrl: './ranking-generation.component.scss'
})
export class RankingGenerationComponent {
	public loading:boolean = false;
	public rs?: any;

	constructor (
		private toast: Toaster,
		private service: UsersService,
	) { }

	public generate() {
		this.loading = true;
		this.service.generateRanking()
			.subscribe({
				next: (rs: any) => {
					this.rs = rs;
					this.toast.success("Ranking Generated!");
					this.loading = false;
				},
				error: (err) => {
					this.toast.error(err);
					this.loading = false;
				}
			});
	}
	
}
