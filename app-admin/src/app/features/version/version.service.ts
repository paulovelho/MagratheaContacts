import { Injectable } from '@angular/core';
import { VersionApi } from './version.api';

@Injectable({
	providedIn: 'root'
})
export class VersionService {
	constructor(
		private api: VersionApi,
	) {}

	public getVersion() {
		return this.api.version();
	}

	public getChangelog() {
		return this.api.changelog();
	}	
}
