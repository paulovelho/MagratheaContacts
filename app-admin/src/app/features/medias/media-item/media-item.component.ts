import { Component, Input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { iImage } from '../images.interface';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss'
})
export class MediaItemComponent {
	@Input() image?: iImage
	@Input() size: number = 50;

	
}
