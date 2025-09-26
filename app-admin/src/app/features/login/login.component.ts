import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '@services/auth/authentication.service';
import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { SharedModule } from '@app/shared/shared.module';
import { FormService } from '@app/services/form/form.service';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';

@Component({
	selector: 'login-form',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	standalone: true,
	imports: [
		SharedModule,
	],
})
export class LoginComponent implements OnInit {
	public form?: FormGroup;
	public loading: boolean = false;

	constructor(
		public fs: FormService,
		private errorService: ErrorHandler,
		private Toaster: Toaster,
		private nav: NavigationService,
		private AuthService: AuthService,
	) {
	}

	ngOnInit(): void {
		this.buildForm();
		this.Toaster
			.setDestination("login-toast", true);
	}

	private buildForm() {
		this.form = this.fs.Build(
			["email", "password"], ["email", "password"]
		);
	}

	public doLogin(): void {
		this.loading = true;
		let valid = this.fs.validate(this.form!);
		if(!valid.valid) {
			this.errorService.ValidationError(valid.errors);
			this.loading = false;
			return;
		}
		let data = valid.data;
		this.AuthService.login(data.email, data.password)
			.then((rs) => {
				console.info(rs);
				this.Toaster.success("welcome back!");
				this.nav.goHome();
			})
			.catch((err) => {
				this.Toaster.error(err.message);
			})
			.finally(() => this.loading = false);
	}

}
