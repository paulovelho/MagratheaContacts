import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppWindowComponent } from './components/app-window/app-window.component';
import { ApiService } from '@app/services/api/api.service';
import { ApiManager } from '@app/services/api/api-manager.service';
import { AuthApi } from '@app/services/auth/auth.api';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { SettingsApi } from '@app/services/settings/settings.api';
import { SettingsService } from '@app/services/settings/settings.service';
import { Store } from '@app/services/store/store.service';
import { Toaster } from '@app/services/toaster/toaster.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiInterceptor } from '@app/services/api/api.interceptor';
import { CacheInterceptor } from '@app/services/api/cache-interceptor/cache.interceptor';
import { AvoidCacheInterceptor } from '@app/services/api/cache-interceptor/avoid-cache.interceptor';
import { ApiDelayerInterceptor } from '@app/services/api/delayer.interceptor';
import { PlatypusLoaderComponent } from './components/platypus-loader/platypus-loader.component';
import { ButtonComponent } from './components/forms/button/button.component';
import { ToastModule } from 'primeng/toast';
import { ErrorHandler } from '@app/services/error-handler/error-handler.service';
import { AppService } from '@app/services/app.service';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { BigLoaderComponent } from './components/big-loader/big-loader.component';
import { MagImageComponent } from '@app/features/medias/mag-image/mag-image.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { MetaService } from '@app/services/meta.service';
import { ErrorBoxComponent } from './components/error-box/error-box.component';

const sharedComponents = [
	CommonModule,
	ToastModule,

	AlertMessageComponent,
	AppCardComponent,
	AppWindowComponent,
	BigLoaderComponent,
	ButtonComponent,
	ErrorBoxComponent,
	MagImageComponent,
	PageTitleComponent,
	PlatypusLoaderComponent,
];


@NgModule({
	imports: sharedComponents,
	exports: sharedComponents,
	declarations: [
	],
	providers: [
		ApiService,
		ApiManager,
		AppService,
		AuthApi,
		ErrorHandler,
		MetaService,
		NavigationService,
		SettingsApi,
		SettingsService,
		Store,
		Toaster,

		DatePipe,
		
		DialogService,
		DynamicDialogRef,
		DynamicDialogConfig,

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
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: ApiDelayerInterceptor,
		// 	multi: true,
		// },
	],
})
export class SharedModule { }
