import { Component } from '@angular/core';
import { PlatypusLoaderComponent } from '../platypus-loader/platypus-loader.component';

@Component({
  selector: 'app-loading-message',
  standalone: true,
  imports: [ PlatypusLoaderComponent ],
  templateUrl: './loading-message.component.html',
  styleUrl: './loading-message.component.scss'
})
export class LoadingMessageComponent {

}
