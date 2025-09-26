import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CacheInterceptor } from '@app/services/api/cache-interceptor/cache.interceptor';
import { RequestCacheEntry } from '@app/services/api/cache-interceptor/request-cache';

@Component({
  selector: 'app-cache',
  standalone: true,
  imports: [ SharedModule ],
	providers: [

	],
  templateUrl: './cache.component.html',
  styleUrl: './cache.component.scss'
})
export class CacheComponent implements OnInit {
	constructor(
		private cache: CacheInterceptor,
	) {}
	public data: any[] = [];
	public body: any;

	ngOnInit(): void {
		this.loadCache();
	}

	private loadCache() {
		let db = this.cache.debugCache();
		db.forEach((value: RequestCacheEntry, key: string) => {
			this.data.push({
				key, value
			});
		});
		console.info(this.data);
	}

	public viewCache(entry: RequestCacheEntry) {
		this.body = JSON.stringify(entry.response.body)
			.replaceAll("{", "{\n")
			.replaceAll(",", ",\n")
			.replaceAll("}", "\n}");
	}

}
