import { Injectable, Injector } from "@angular/core";
import { BaseApi } from "@services/api/base.api";
import { Observable } from "rxjs";
import { ImagesConfig } from "@environments/images";

@Injectable()
export class ImagesApi extends BaseApi {

	private privateKey: string;
	private publicKey: string;

	constructor(
		injector: Injector
	) {
		super(injector);
		this.privateKey = ImagesConfig.private_key;
		this.publicKey = ImagesConfig.public_key;
		this.base = ImagesConfig.api;
	}

	public getImages(page:number=0): Observable<any> {
		let url = this.url("/key/:key/images")
			.params({ key: this.privateKey })
			.queryParams({ page });
		return this.get(url).pipe(this.defaultMap);
	}

	public getSettings(): Observable<any> {
		const url = this.url("/settings");
		return this.get(url, true).pipe(this.defaultMap);
	}

	public getDetails(id: string): Observable<any> {
		const url = this.url("/image/:key/:id/details").params({ key: this.publicKey, id });
		return this.get(url).pipe(this.defaultMap);
	}

	public uploadImage(files: any[]): Observable<any> {
		const url = this.url("/key/:key/upload").params({ key: this.privateKey });
		return this.upload(url, files, null).pipe(this.defaultMap);
	}

	public uploadImageFromUrl(link: string): Observable<any> {
		const url = this.url("/key/:key/upload-url").params({ key: this.privateKey });
		return this.post(url, { url: link }).pipe(this.defaultMap);
	}
	public deleteImage(id: string): Observable<any> {
		const url = this.url("/key/:key/delete/:id").params({ key: this.privateKey, id });
		return this.del(url).pipe(this.defaultMap);
	}

}
