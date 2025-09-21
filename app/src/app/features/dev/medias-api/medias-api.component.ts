import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api/api.service';
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
		this.config = this.getConfig();
		this.api = ImagesConfig.api;
	}

	ngOnInit(): void {
		this.loadApiInfo();
	}

	private getConfig() {
		const maskPwd = (sensitiveInfo:string) => '*'.repeat(sensitiveInfo.length - 4) + sensitiveInfo.slice(-4);
		let rawC = ImagesConfig;
		rawC['private_key'] = maskPwd(rawC['private_key']);
		return rawC;
	}

	public loadApiInfo() {
		let apiInfoUrl = this.api + "/version";
		this.apiService.getApi(apiInfoUrl, null, false)
			.subscribe(a => {
				this.loading = false;
				this.apiResponse = a;
			});
	}

}
