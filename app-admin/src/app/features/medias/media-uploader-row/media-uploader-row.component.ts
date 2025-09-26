import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iImage } from '../images.interface';
import { Helper } from '@app/services/helpers/helper.service';
import { SharedModule } from '@app/shared/shared.module';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-media-uploader-row',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './media-uploader-row.component.html',
  styleUrl: './media-uploader-row.component.scss'
})
export class MediaUploaderRowComponent implements OnInit {
	@Input() file?: iImage;
	@Input() selectable: boolean = false;
	@Output() onSelect: Subject<iImage> = new EventEmitter<iImage>();

	public size?: string;

	ngOnInit(): void {
		this.size = this.getSize(this.file!.size!);
	}

	public getSize(size:number): string {
		return Helper.formatBytes(size);
	}

	public click() {
		this.onSelect.next(this.file!);
	}

}
