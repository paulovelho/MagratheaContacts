import { Injectable } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { MediaSelectorComponent } from "./media-selector/media-selector.component";

@Injectable({
  providedIn: 'root'
})
export class ImageSelector {
	
  constructor(
		private dialogService: DialogService,
	) {
	}

	public selectImage() {
		return new Promise((resolve, reject) => {
			this.dialogService.open(MediaSelectorComponent, {
				styleClass: "hide-header",
				modal: true,
				draggable: false,
				resizable: false,
				closeOnEscape: true,
				closable: true,
				maximizable: true,
				width: "90%",	
			})
			.onClose.subscribe({
				next: resolve,
				error: reject
			});
		});
	}

}
