import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { iApikey } from '../apikey.interface';
import { SharedModule } from '@app/shared/shared.module';

@Component({
	selector: 'app-apikey-item',
	templateUrl: './apikey-item.component.html',
	styleUrls: ['./apikey-item.component.scss'],
	imports: [
		SharedModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApikeyItemComponent {
	@Input() apikey!: iApikey;
	@Output() edit = new EventEmitter<iApikey>();

	constructor() {}

	onEdit(): void {
		this.edit.emit(this.apikey);
	}
}
