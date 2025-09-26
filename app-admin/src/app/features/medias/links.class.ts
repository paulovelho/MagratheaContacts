import { UrlBuilder } from "@app/services/api/base.api";
import { ImagesConfig } from "@environments/images";

export class ImageLink {
	public static getLink(id:number|string, size: string, placeholder:boolean=false): string {
		const endpoint =	"/image/:key/:id/x/:size";
		let url = new UrlBuilder(ImagesConfig.api, endpoint)
			.params({
				key: ImagesConfig.public_key,
				id: id,
				size: size,
			});
		if(placeholder) url.queryParams({ "placeholder": 1 });
		return url.get();
	}

	public static getRawLink(id:number|string): string {
		const endpoint =	"/image/:key/:id/raw";
		let url = new UrlBuilder(ImagesConfig.api, endpoint)
			.params({
				key: ImagesConfig.public_key,
				id: id,
			});
		return url.get();
	}

}
