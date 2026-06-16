import { BaseModelValidationError, BaseModelValidation } from './base-model-validation.interface';

export class BaseModel {

	protected validations = null;
	protected fields: Array<string> = [];
	public id: string = "";
	public touched: boolean = false;

	constructor() {}

	getName() {
    return (<any>this).constructor.name;
  }

	public from(obj) {
		let props: Array<string> = Object.getOwnPropertyNames(obj);
		props.forEach(i => this[i] = obj[i]);
		if( obj._id ) {
			this.id = obj._id;
		}
		return this;
	}

	public getPlainForm() {
		let form: any = {};
		this.fields.forEach(i => form[i] = ['']);
		return form
	}

	public getData() {
		let data: any = {};
		this.fields.forEach(i => data[i] = this[i] || null);
		return data;
	}

	public clone(): this {
		return <this> (<any> Object).assign( Object.create( Object.getPrototypeOf(this) ), this);
	}

	public validate(): BaseModelValidation {
		if(!this.validations) return { ok: true };
		let keys: Array<string> = Object.keys(this.validations);
		let valid = true;
		let errors: Array<BaseModelValidationError> = [];
		keys.forEach((key) => {
			let validations: Array<any> = this.validations[key];
			validations.forEach( (v) => {
				let validat = this.validateKey(key, v);
				if(validat === true) return;
				valid = false;
				errors.push({ key: key, error: validat });
			});
		});

		if (valid) {
			return { ok: true };
		}
		return { 
			ok: false,
			errors: errors
	  };
	}

	public getFunctionName(fn) {
		let name: string = fn.name;
		let splitName = name.split(' ');
		return splitName[splitName.length - 1];
	}

	public validateKey(key, validation) {
		if( validation == "required" ) {
			return this[key] ? true : validation;
		}
		if( validation instanceof Function ) {
			return validation() ? true : this.getFunctionName(validation);
		}
	}

	public displayErrors(errors: Array<any>) {
		let response: string = "";
		errors.forEach((data) => response += data.key + " is " + data.error + ";\n");
		return response;
	}

}

BaseModel.prototype.toString = function(): string {
	let str = '{ CLASS ' + this.getName() + ' => ';
	let props: Array<string> = Object.getOwnPropertyNames(this);
	props.forEach((i) => {
		if( i == "validations" ) return;
		str += '"' + i + '": ' + '"' + this[i] + '"; ';
	});
	str += "}";
	return str;
}
