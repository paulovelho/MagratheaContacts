import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MediaUploaderComponent } from '../media-uploader/media-uploader.component';
import { MediaUploaderUrlComponent } from '../media-uploader-url/media-uploader-url.component';

import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-media-uploader-home',
  standalone: true,
  imports: [
		SharedModule,
		DividerModule,
		MediaUploaderComponent,
		MediaUploaderUrlComponent,
	],
  templateUrl: './media-uploader-home.component.html',
  styleUrl: './media-uploader-home.component.scss'
})
export class MediaUploaderHomeComponent {

	public imageUploaded(data:any) {
		console.info("file selected: ", data);
	}

}
