import { Component, Input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { Observable } from 'rxjs';

type apiFunction = () => Observable<any>;

@Component({
  selector: 'app-api-caller',
  standalone: true,
  imports: [
		SharedModule,
		ApiCallerComponent,
	],
  templateUrl: './api-caller.component.html',
  styleUrl: './api-caller.component.scss'
})
export class ApiCallerComponent {
	public loading:boolean = false;
	public result:string = "...";
	@Input() call?:apiFunction;
	@Input() title:string = "api calling!";
	@Input() btnCaption:string = "call API";
	@Input() icon:string = "";
	@Input() hideContent:boolean = false;

	constructor (
	) {}

	public callClick() {
		this.loading = true;
		if(!this.call) return;
		this.call().subscribe({
			next: (rs) => {
				this.result = rs;
				this.loading = false;
			}
		})
	}

}
