import { DynamicDialogConfig } from "primeng/dynamicdialog";

export const dialogOptions: DynamicDialogConfig = {
	closable: true,
	modal: true,
	resizable: true,
	draggable:  true,
};

export const getDialogOptions = (title: string, data?: any): DynamicDialogConfig => {
	let options = dialogOptions;
	options.header = title;
	options.data = data;
	return options;
}
