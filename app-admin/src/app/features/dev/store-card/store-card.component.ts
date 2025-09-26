import { Component, Input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-store-card',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.scss'
})
export class StoreCardComponent {

	@Input() title: string = "";
	@Input() loading: boolean = false;
	@Input() content: string = " -- ";

}
