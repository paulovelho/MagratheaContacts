import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-group',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
	@Input() title?: string;
}
