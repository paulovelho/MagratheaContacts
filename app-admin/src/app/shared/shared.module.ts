import { importProvidersFrom, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// services:
import { ApiService } from '@services/api/api.service';
import { AuthService } from '@services/auth/authentication.service';
import { AuthApi } from '@services/auth/auth.api';
import { CacheInterceptor } from '@services/api/cache-interceptor/cache.interceptor';
import { FormService } from '@app/services/form/form.service';
import { LayoutService } from '@app/services/layout/layout.service';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Store } from '@services/store/store.service';
import { Toaster } from '@services/toaster/toaster.service';

import { ApiManager } from '@services/api/api-manager.service';
import { ApiInterceptor } from '@services/api/api.interceptor';
import { ApiDelayerInterceptor } from '@services/api/delayer.interceptor';
import { ErrorHandler } from '@services/error-handler/error-handler.service';

// primeNG:
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

// components:
import { ActiveBulletComponent } from './components/active-bullet/active-bullet.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppWindowComponent } from './components/app-window/app-window.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { PlatypusLoaderComponent } from './components/platypus-loader/platypus-loader.component';

// form components:
import { InputComponent } from './components/forms/input/input.component';
import { ButtonComponent } from './components/forms/button/button.component';
import { SelectComponent } from './components/forms/select/select.component';
import { ToastModule } from 'primeng/toast';
import { AvoidCacheInterceptor } from '@app/services/api/cache-interceptor/avoid-cache.interceptor';
import { TextComponent } from './components/forms/text/text.component';
import { SettingsApi } from '@app/services/settings/settings.api';
import { SettingsService } from '@app/services/settings/settings.service';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component';
import { AppState } from '@app/app.state';
import { FontAwesomeSharedModule } from './font-awesome.module';

const imports = [
	CommonModule,
	DynamicDialogModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule,

	ActiveBulletComponent,
	AppCardComponent,
	AppWindowComponent,
	LoadingMessageComponent,
	PlatypusLoaderComponent,

	ButtonComponent,
	CheckboxComponent,
	InputComponent,
	SelectComponent,
	TextComponent,

	CardModule,
	ToastModule,

	FontAwesomeSharedModule,
];

@NgModule({
	imports,
	declarations: [
	],
	providers: [
		ApiService,
		ApiManager,
		AuthService,
		AuthApi,
		DatePipe,
		DialogService,
		ErrorHandler,
		FormService,
		LayoutService,
		SettingsApi,
		SettingsService,

		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AvoidCacheInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiDelayerInterceptor,
			multi: true,
		},
	],
	exports: imports
})
export class SharedModule {
}
