import { Injectable } from '@angular/core';

import { ImagesApi } from './images.api';
import { iImage } from './images.interface';
import { Observable, map, tap } from 'rxjs';
import { ImageLink } from './links.class';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

	private settings?: any;

  constructor(
		private api: ImagesApi,
	) {
		this.loadSettings();
	}

	public getLink(id:number|string, size: string, placeholder:boolean=false): string {
		return ImageLink.getLink(id, size, placeholder);
	}

	public getSimpleImage(i: any): iImage {
		let data: iImage = {
			id: +i['id'],
			name: i['name'],
			filename: i['filename'],
			extension: i['extension'],
			width: +i['width'],
			height: +i['height'],
			size: +i['size'],
		};
		return data;
	}

	public getImages(page:number=0): Observable<any> {
		return this.api.getImages(page)
			.pipe(
				map((rs: any) => {
					let list = rs["images"];
					return {
						page: rs["page"],
						has_more: rs["has_more"],
						data: list.map((i:any) => this.getSimpleImage(i)),
					}
				})
			);
	}
	public imageDetails(id: string): Observable<any> {
		return this.api.getDetails(id);
	}

	public loadSettings(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.api.getSettings()
				.subscribe(rs => {
					this.settings = rs;
					resolve(rs);
				});
		})
	}

	public upload(file:any[]): Observable<any> {
		return this.api.uploadImage(file);
	}
	public uploadFromUrl(link:string): Observable<any> {
		return this.api.uploadImageFromUrl(link);
	}

	public remove(id: string): Observable<any> {
		return this.api.deleteImage(id);
	}

}
