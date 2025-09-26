import { Component, ViewEncapsulation } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { MediaListComponent } from '../media-list/media-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { iImage } from '../images.interface';
import { MediaUploaderUrlComponent } from '../media-uploader-url/media-uploader-url.component';
import { MediaUploaderComponent } from '../media-uploader/media-uploader.component';

@Component({
  selector: 'app-media-selector',
	encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
		SharedModule,
		TabViewModule,
		MediaListComponent,
		MediaUploaderComponent,
		MediaUploaderUrlComponent,
	],
  templateUrl: './media-selector.component.html',
  styleUrl: './media-selector.component.scss'
})
export class MediaSelectorComponent {

	constructor(
		private ref: DynamicDialogRef,
	) { }

	public close() {
		this.ref.close();
	}
	public selectImage(image: iImage|null) {
		this.ref.close(image);
	}

}
