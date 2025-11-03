import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CacheInterceptor } from '@app/services/api/cache-interceptor/cache.interceptor';
import { RequestCache, RequestCacheEntry } from '@app/services/api/cache-interceptor/request-cache';

@Component({
  selector: 'app-cache',
  standalone: true,
  imports: [ SharedModule ],
	providers: [ ],
  templateUrl: './cache.component.html',
  styleUrl: './cache.component.scss'
})
export class CacheComponent implements OnInit {
	private cache: RequestCache;
	constructor(
	) {
		this.cache = inject(RequestCache);
	}
	public data: any[] = [];
	public body: any;

	ngOnInit(): void {
		this.loadCache();
	}

	private loadCache() {
		console.log(this.cache);
		let db = this.cache.debug();
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
