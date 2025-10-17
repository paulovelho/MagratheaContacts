import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export interface formProp {
	name: string;
	required: boolean;
}

/**
 * A service that provides helper methods for creating and managing Angular `FormGroup` instances.
 * It simplifies building forms, validating them, and handling their data.
 */
@Injectable()
export class FormService {

	constructor(
		private fb: FormBuilder,
	) { }

	/**
	 * Returns a CSS class object to apply validation styling to a form.
	 * It adds the 'form-validate' class if the form has been touched.
	 * @param form The FormGroup to check.
	 * @returns An object with a `form-validate` key.
	 */
	public formClass(form?: FormGroup): any {
		if(!form) return {};
		return { 'form-validate': form.touched };
	}

	/**
	 * Builds a `FormGroup` from an array of property definitions.
	 * @param interfaceProps An array of `formProp` objects, each defining a field's name and whether it's required.
	 * @returns A new `FormGroup` instance.
	 */
	public BuildFromInterface(interfaceProps: formProp[]): FormGroup {
		let fields: string[] = [];
		let required: string[] = [];
		interfaceProps.forEach((i: any) => {
			let name = i.name
			fields.push(name);
			if(!i.optional) {
				required.push(name);
			}
		});
		return this.Build(fields, required);
	}

	/**
	 * Builds a `FormGroup` from arrays of field names.
	 * @param fields An array of all field names to be included in the form.
	 * @param required An optional array of field names that should have the `Validators.required` validator.
	 * @returns A new `FormGroup` instance.
	 */
	public Build(fields: string[], required: string[] = []): FormGroup {
		let controls: any = {};
		fields.forEach((f: string) => {
			controls[f] = [''];
		});
		required.forEach((f) => controls[f] = ['', Validators.required]);
		return this.fb.group(controls);
	}

	/**
	 * Builds a `FormGroup` from a given controls configuration object.
	 * This is a direct wrapper around `FormBuilder.group`.
	 * @param controls A collection of child controls.
	 * @returns A new `FormGroup` instance.
	 */
	public BuildFromGroup(controls: any): FormGroup {
		return this.fb.group(controls);
	}

	/**
	 * Populates a `FormGroup` with values from an object.
	 * It iterates over the form's controls and sets their values from the corresponding keys in the provided object.
	 * @param form The `FormGroup` to populate.
	 * @param object The object containing the values to set.
	 * @returns The populated `FormGroup` instance.
	 */
	public setObject(form: FormGroup, object: any): FormGroup {
		const keys = Object.keys(form.controls!);
		keys.forEach(key => form.controls[key].setValue(object[key]));
		return form;
	}

	/**
	 * Retrieves only the changed (dirty) values from a `FormGroup`.
	 * @param form The `FormGroup` to extract data from.
	 * @returns An object containing only the key-value pairs for controls that have been modified.
	 */
	public getChangedData(form: FormGroup): any {
		let data: any = {};
		Object.keys(form.controls).forEach((key: string) => {
			let control = form.get(key);
			if(control == null) return;
			if(control.pristine) return;
			data[key] = control.value;
		});
		return data;
	}

	/**
	 * Validates a `FormGroup`, marks all fields as touched, and collects validation errors.
	 * @param form The `FormGroup` to validate.
	 * @returns An object containing the validation status (`valid`), the changed form `data`,
	 * an `errors` array with details about each validation failure, and a formatted `errorString`.
	 */
	public validate(form: FormGroup): any {
		form.markAsTouched();
		let errors: any[] = [];
		let valid: boolean = form.valid;
		let errorString: string = "";
		const data = this.getChangedData(form);
		if(valid) {
			return { valid, data };
		}
		Object.keys(form.controls).forEach(key => {
			const controlErrors: ValidationErrors|null = form.get(key)?.errors ?? null;
			if (controlErrors == null) return;
			form.get(key)?.setErrors({'invalid': true})
			Object.keys(controlErrors).forEach(keyError => {
				errorString += `${key} is ${keyError}; <br/>`;
				errors.push({
					key: key,
					error: keyError,
					data: controlErrors[keyError],
				});
			});
		});
		return { valid, data, errors, errorString };
	}

}
