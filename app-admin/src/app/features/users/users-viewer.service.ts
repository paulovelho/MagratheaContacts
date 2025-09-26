import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserViewComponent } from './user-view/user-view.component';

@Injectable({
  providedIn: 'root'
})
export class UsersViewerService {

  constructor(
		private dialogService: DialogService,
	) { }

	public viewUser(userId: number) {
		return this.dialogService.open(UserViewComponent, {
			data: { id: userId },
			header: "User #"+userId,
			modal: true,
			draggable: false,
			resizable: false,
			closeOnEscape: true,
			maximizable: false,
			width: "500px",
		});
	}

}
