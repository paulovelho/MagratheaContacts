import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-bullet',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [ BadgeModule ],
  templateUrl: './active-bullet.component.html',
  styleUrl: './active-bullet.component.scss'
})
export class ActiveBulletComponent implements OnInit {
	@Input() status: boolean|null = null;
	@Input() value: string = "";
	@Input() type: "success"|"info"|"warn"|"danger"|"secondary"|"contrast" = "secondary";

	ngOnInit(): void {
		if(this.status != null) {
			this.type = this.status ? "success" : "danger";
		}
	}

}
