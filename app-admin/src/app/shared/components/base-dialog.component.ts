import { inject } from "@angular/core";
import { BaseAppComponent } from "./base-app.component";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

export class BaseDialogComponent extends BaseAppComponent {
	public dialogRef = inject(DynamicDialogRef);
	public config = inject(DynamicDialogConfig);

	public getData(): any {
		return this.config.data;
	}

	public close(data?:any): any {
		this.setLoading(false);
		this.dialogRef.close(data);
	}

}
