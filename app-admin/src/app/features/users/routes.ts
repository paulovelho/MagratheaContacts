import { Routes } from "@angular/router";
import { UserHomeComponent } from "./user-home/user-home.component";
import { UserRankingComponent } from "./user-ranking/user-ranking.component";
import { RankingGenerationComponent } from "./ranking-generation/ranking-generation.component";

export const routes: Routes = [
	{
		path: '',
		component: UserHomeComponent,
	},
	{
		path: 'ranking',
		component: UserRankingComponent,
	},
	{
		path: 'generate-ranking',
		component: RankingGenerationComponent,
	},
];
