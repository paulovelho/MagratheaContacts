import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, Optional } from '@angular/core';
import { iSmtp } from '../smtp.interface';
import { SharedModule } from '@app/shared/shared.module';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-smtp-item',
	standalone: true,
	imports: [
		SharedModule,
	],
	templateUrl: './smtp-item.component.html',
	styleUrls: ['./smtp-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmtpItemComponent {
	@Input({ required: true }) smtp!: iSmtp;
	@Input() showSelectButton: boolean = false;
	@Output() edit = new EventEmitter<iSmtp>();
	@Output() select = new EventEmitter<iSmtp>();
	public isSelectionMode: boolean = false;

	constructor(
		@Optional() private ref: DynamicDialogRef,
	) {
		this.isSelectionMode = !!this.ref;
	}

	onEdit(): void {
		this.edit.emit(this.smtp);
	}

	onSelectClick(): void {
		this.select.emit(this.smtp);
	}

	onItemClick(): void {
		if (this.isSelectionMode) {
			this.ref.close(this.smtp);
		}
	}
}
