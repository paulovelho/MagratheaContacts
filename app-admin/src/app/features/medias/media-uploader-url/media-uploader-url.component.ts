import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { iImage } from '../images.interface';
import { SharedModule } from '@app/shared/shared.module';
import { ImagesService } from '../images.service';
import { ImagesApi } from '../images.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { MediaUploaderRowComponent } from '../media-uploader-row/media-uploader-row.component';

@Component({
  selector: 'app-media-uploader-url',
  standalone: true,
  imports: [
		SharedModule,
		MediaUploaderRowComponent,
	],
	providers: [ ImagesService, ImagesApi ],
  templateUrl: './media-uploader-url.component.html',
  styleUrl: './media-uploader-url.component.scss'
})
export class MediaUploaderUrlComponent implements OnInit {
	@Output() onSelect: Subject<iImage|null> = new EventEmitter<iImage|null>();
	public loading: boolean = false;
	public selectable: boolean = false;
	public url: string = "";
	public uploadedImage?: any;

	constructor(
		private service: ImagesService,
		private toaster: Toaster,
	) { }

	ngOnInit(): void {
		this.selectable = this.onSelect.observed;
	}

	public mediaSelect(media: iImage|null) {
		this.onSelect.next(media);
	}

	public uploadFromUrl() {
		console.info("uploading " + this.url);
		if(!this.url) {
			this.toaster.error("URL can't be empty (of course)");
			return;
		}
		this.loading = true;
		this.service.uploadFromUrl(this.url)
			.subscribe({
				next: (rs) => {
					this.uploadedImage = rs.image;
				},
				error: (err: Error) => {
					const message = err.message;
					this.toaster.error(message);
					this.loading = false;
				},
				complete: () => this.loading = false
			})
	}

}
