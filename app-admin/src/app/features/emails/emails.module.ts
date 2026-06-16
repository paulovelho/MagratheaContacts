import { NgModule } from '@angular/core';
import { routes } from './routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
		RouterModule.forChild(routes),
  ]
})
export class EmailsModule { }
