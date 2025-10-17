import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { iSmtp } from '../smtp.interface';
import { ButtonComponent } from '@app/shared/components/forms/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-smtp-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './smtp-item.component.html',
  styleUrls: ['./smtp-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmtpItemComponent {
  @Input({ required: true }) smtp!: iSmtp;
  @Output() edit = new EventEmitter<iSmtp>();
  @Output() remove = new EventEmitter<iSmtp>();

  onEdit(): void {
    this.edit.emit(this.smtp);
  }

  onDelete(): void {
    this.remove.emit(this.smtp);
  }
}