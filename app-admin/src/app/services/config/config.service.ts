import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
	private config: { apiUrl: string } = { apiUrl: '' };

	get apiUrl(): string {
		return this.config.apiUrl;
	}

	load(): Promise<void> {
		return fetch('/config.json')
			.then(r => r.json())
			.then(cfg => { this.config = cfg; });
	}
}
