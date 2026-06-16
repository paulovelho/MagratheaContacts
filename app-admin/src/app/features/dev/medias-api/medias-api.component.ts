import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api/api.service';
import { RequestBuilder } from '@app/services/api/base.api';
import { SharedModule } from '@app/shared/shared.module';
import { ImagesConfig } from '@environments/images';

@Component({
  selector: 'app-medias-api',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './medias-api.component.html',
  styleUrl: './medias-api.component.scss'
})
export class MediasApiComponent implements OnInit {
	public loading: boolean = true;
	public api: string;
	public apiResponse?: string;
	public config?: any;

	constructor(
		private apiService: ApiService
	) {
		this.config = ImagesConfig;
		this.api = ImagesConfig.api;
	}

	ngOnInit(): void {
		this.loadApiInfo();
	}

	public loadApiInfo() {
		let apiInfoUrl = new RequestBuilder(this.api, "version");
		this.apiService.getApi(apiInfoUrl, null, false)
			.subscribe(a => {
				this.loading = false;
				this.apiResponse = a;
			});
	}

}
