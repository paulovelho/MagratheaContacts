import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

import { ImageLink } from '../links.class';
import { ImagesService } from '../images.service';
import { ImagesApi } from '../images.api';
import { Helper } from '@app/services/helpers/helper.service';
import { Toaster } from '@app/services/toaster/toaster.service';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
		SharedModule,
		ContextMenuModule,
	],
	providers: [
		ImagesService, ImagesApi,
	],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent implements OnInit {
	public loading: boolean = false;
	public image_id?: number;
	public data: any;
	public size: string = "???";

	public contextMenu: MenuItem[] | undefined;
	public showRawData: boolean = false;

	constructor(
		public ref: DynamicDialogRef,
		public config: DynamicDialogConfig,
		private toaster: Toaster,
		private service: ImagesService,
	) {
		const dialogData = this.config.data;
		this.image_id = dialogData.id;
	}

	ngOnInit(): void {
		this.getDetails();
		this.buildContextMenu();
	}

	private buildContextMenu(): void {
		this.contextMenu = [
			{
				label: "View Raw Image",
				icon: "fa fa-expand-arrows-alt",
				command: () => this.viewRaw(),
			},
			{
				label: "Show Raw Data",
				icon: "fa fa-table",
				command: () => this.showRawData = true,
			},
		]
	}

	public viewRaw(): void {
		const url = ImageLink.getRawLink(this.image_id!);
    window.open(url, "_blank");
	}

	public getDetails() {
		this.loading = true;
		this.service.imageDetails(this.image_id!.toString())
			.subscribe({
				next: (rs: any) => {
					this.data = rs;
					this.size = Helper.formatBytes(this.data.size);
				},
				error: (err: any) => {
					console.error(err);
					this.toaster.error(err);
				},
				complete: () => this.loading = false,
			})
	}

	public remove() {
		this.loading = true;
		const message = "Delete image #" + this.data.name + " ?";
		if(!confirm(message)) return;
		this.service.remove(this.image_id!.toString())
			.subscribe({
				next: (rs) => {
					this.toaster.success("Image deleted");
					this.ref.close();
				},
				error: (err) => {
					this.toaster.error(err);
				},
				complete: () => this.loading = false,
			});
	}

}
