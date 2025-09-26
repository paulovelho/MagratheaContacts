import { Routes } from "@angular/router";
import { MediaHomeComponent } from "./media-home/media-home.component";
import { MediaUploaderHomeComponent } from "./media-uploader-home/media-uploader-home.component";

export const routes: Routes = [
	{
		path: '',
		component: MediaHomeComponent,
	},
	{
		path: 'images',
		component: MediaHomeComponent,
	},
	{
		path: 'upload',
		component: MediaUploaderHomeComponent,
	}

];
