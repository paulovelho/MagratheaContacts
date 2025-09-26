import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImagesService } from '../images.service';
import { ImagesApi } from '../images.api';
import { Toaster } from '@app/services/toaster/toaster.service';
import { Subject } from 'rxjs';
import { iImage } from '../images.interface';
import { MediaUploaderRowComponent } from '../media-uploader-row/media-uploader-row.component';

@Component({
  selector: 'app-media-uploader',
  standalone: true,
  imports: [
		SharedModule,
		FileUploadModule,
		MediaUploaderRowComponent,
	],
	providers: [
		ImagesService,
		ImagesApi,
	],
  templateUrl: './media-uploader.component.html',
  styleUrl: './media-uploader.component.scss'
})
export class MediaUploaderComponent implements OnInit {
	@Output() onSelect: Subject<iImage|null> = new EventEmitter<iImage|null>();
	@ViewChild('uploadBox') primeFileUpload?: FileUpload;
	public loading: boolean = false;
	public selectable: boolean = false;
	public currentFiles: any[] = [];
	public uploadedFiles: any[] = [];
	public maxFileSize: number|null = null;

	constructor(
		private toaster: Toaster,
		private service: ImagesService,
	) {
		this.toaster.setDestination("image-upload-toast", false);
	}

	ngOnInit(): void {
		this.service.loadSettings()
			.then(rs => this.maxFileSize = rs.upload_limit_bytes);
		this.selectable = this.onSelect.observed;
	}

	public mediaSelect(media: iImage|null) {
		this.onSelect.next(media);
	}

	public onUpload(event:any) {
		for(let file of event.files) {
			this.uploadedFiles.push(file);
		}
	}

	public onSelectFile(event: any) {
		this.currentFiles = event.currentFiles;
	}
	public onRemove(event: any) {
	}

	public choose() {
		return this.primeFileUpload?.choose();
	}

	public updateProgress(progress:number) {
		this.primeFileUpload!.progress = progress;
		if(progress >= 100) {
			setTimeout(() => this.clear(), 1000);
		}
	}
	private clear() {
		this.primeFileUpload!.clear();
		this.loading = false;
	}

	public send(event: any) {
		const files: any[] = event.files;
		this.loading = true;

		let progressPerFile  = 100/files.length;
		let progress: number = 0;
		this.updateProgress(0);

		files.forEach((file:any, index:number) => {
			this.service.upload(file)
				.subscribe({
					next: rs => {
						if(rs.success) {
							this.uploadedFiles.push(rs.image);
						}
						this.toaster.success("uploaded: " + file.name);
					},
					error: err => {
						console.error(err);
						this.toaster.error("Error on upload");
						this.loading = false;
					},
					complete: () => {
						progress = progress + progressPerFile;
						this.updateProgress(progress);
					}
				});
		});
	}
}
