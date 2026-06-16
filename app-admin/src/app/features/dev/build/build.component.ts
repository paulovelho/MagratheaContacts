import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { buildInfo } from '@environments/version';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './build.component.html',
  styleUrl: './build.component.scss'
})
export class BuildComponent {

	public buildData: any = buildInfo;
	public envData: any = environment;
	public env: string;
	public dateFormat?: string;

	constructor(
	) {
		this.env = environment['envName'];
	}

}
