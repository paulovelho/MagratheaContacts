import { DynamicDialogConfig } from "primeng/dynamicdialog";

export const dialogOptions: DynamicDialogConfig = {
	closable: true,
	modal: true,
	resizable: true,
	draggable:  true,
};

export const getDialogOptions = (title: string, data?: any, overrideOptions?: DynamicDialogConfig): DynamicDialogConfig => {
	return {
		...dialogOptions,
		...overrideOptions,
		header: title,
		data,
	};
}
