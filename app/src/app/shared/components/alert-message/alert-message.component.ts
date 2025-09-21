import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss'
})
export class AlertMessageComponent {
	@Input() icon: string = "fa fa-comments";
	@Input() type: 'primary'|'success'|'danger'|'info' = "primary";
	@Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}
