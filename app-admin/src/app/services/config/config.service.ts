import { Injectable } from '@angular/core';

export class ConfigError extends Error {
	constructor(message: string, public readonly url: string) {
		super(message);
		this.name = 'ConfigError';
	}
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
	private config: { apiUrl: string } = { apiUrl: '' };

	get apiUrl(): string {
		return this.config.apiUrl;
	}

	async load(): Promise<void> {
		const url = new URL('config.json', document.baseURI).href;

		let response: Response;
		try {
			response = await fetch(url);
		} catch (e) {
			throw new ConfigError(`Could not reach ${url} (${(e as Error).message}).`, url);
		}
		if (!response.ok) {
			throw new ConfigError(`${url} returned HTTP ${response.status}. The file is probably missing.`, url);
		}

		const body = await response.text();
		let cfg: unknown;
		try {
			cfg = JSON.parse(body);
		} catch {
			const msg = body.trimStart().startsWith('<')
				? `${url} returned an HTML page instead of JSON. The file is probably missing and the server fell back to index.html.`
				: `${url} is not valid JSON.`;
			throw new ConfigError(msg, url);
		}

		const apiUrl = (cfg as { apiUrl?: unknown } | null)?.apiUrl;
		if (typeof apiUrl !== 'string' || apiUrl.trim() === '') {
			throw new ConfigError(`${url} has no "apiUrl" string.`, url);
		}
		this.config = { apiUrl };
	}
}
