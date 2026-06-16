import { NgModule } from '@angular/core';
import { GeneralApi, GeneralService } from './general.service';
import { ApiService } from '../api/api.service';

@NgModule({
	declarations: [],
	imports: [
	],
	providers: [
		ApiService,
		GeneralApi,
		GeneralService,
	],
})
export class GeneralModule { }
