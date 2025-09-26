import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export interface formProp {
	name: string;
	required: boolean;
}

@Injectable()
export class FormService {

	constructor(
		private fb: FormBuilder,
	) { }

	public formClass(form?: FormGroup): any {
		if(!form) return {};
		return { 'form-validate': form.touched };
	}

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

	public Build(fields: string[], required: string[] = []): FormGroup {
		let controls: any = {};
		fields.forEach((f: string) => {
			controls[f] = [''];
		});
		required.forEach((f) => controls[f] = ['', Validators.required]);
		return this.fb.group(controls);
	}

	public BuildFromGroup(controls: any): FormGroup {
		return this.fb.group(controls);
	}

	public setObject(form: FormGroup, object: any): FormGroup {
		const keys = Object.keys(form.controls!);
		keys.forEach(key => form.controls[key].setValue(object[key]));
		return form;
	}

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
