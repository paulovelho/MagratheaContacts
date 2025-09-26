import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { DialogService } from 'primeng/dynamicdialog';

import { MediaListComponent } from '../media-list/media-list.component';
import { iImage } from '../images.interface';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-media-home',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
		SharedModule,
		MediaListComponent,
	],
	providers: [
		DialogService,
	],
  templateUrl: './media-home.component.html',
  styleUrl: './media-home.component.scss'
})
export class MediaHomeComponent {

	constructor(
		private dialog: DialogService,
	) { }

	public selectImage(img: iImage) {
		this.dialog.open(ImageViewerComponent, {
			data: { id: img.id },
			header: "Image: " + img.name,
			modal: true,
			draggable: true,
			resizable: false,
			closeOnEscape: true,
			width: "750px",
		})
	}

}
