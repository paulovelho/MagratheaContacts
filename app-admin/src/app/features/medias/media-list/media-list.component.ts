import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ImagesApi } from '../images.api';
import { ImagesService } from '../images.service';
import { iImage } from '../images.interface';
import { MediaItemComponent } from '../media-item/media-item.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [
		SharedModule,
		MediaItemComponent,
	],
	providers: [ ImagesApi, ImagesService ],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss'
})
export class MediaListComponent implements OnInit {
	@Output() onSelect: Subject<iImage> = new EventEmitter<iImage>();

	public loading: boolean = false;
	public hasMore: boolean = false;
	public cols: number = 6;
	public bootstrapCol: string = "";
	public list: iImage[] = [];
	public page: number = 0;
	public selectable: boolean = false;
	public thumbSize: number = 100;

	constructor(
		private imageService: ImagesService,
	) {
		this.bootstrapCol = "col-sm-" + (12/this.cols);
	}

	ngOnInit(): void {
		this.loadImages();
		if(this.onSelect.observed) {
			this.selectable = true;
		}
		this.imageService.loadSettings()
			.then(rs => this.thumbSize = rs.thumb_size);
	}

	public loadImages() {
		this.loading = true;
		this.imageService.getImages(this.page)
			.subscribe({
				next: (rs) => {
					console.info("images: ", rs);
					this.hasMore = rs.has_more;
					this.list = this.list.concat(rs.data);
					this.loading = false;
				},
				error: (err) => console.error(err)
			});
	}
	public loadMore() {
		this.page++;
		this.loadImages();
	}

	public imageSelect(img: any) {
		this.onSelect.next(img);
	}

}
