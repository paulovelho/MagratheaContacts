import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Injector,
	Input,
	OnInit,
	Output,
	ViewEncapsulation,
	forwardRef
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	NgControl,
	ValidationErrors,
	Validator
} from '@angular/forms';
import { PlatypusLoaderComponent } from '../../platypus-loader/platypus-loader.component';
import { FloatLabelModule } from "primeng/floatlabel"
import { SelectModule } from 'primeng/select';

export interface iSelectOption {
	label: string;
	value: string|number;
};

@Component({
  selector: 'app-select',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
		CommonModule,
		SelectModule,
		FloatLabelModule,
		FormsModule,
		PlatypusLoaderComponent,
	],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: SelectComponent,
			multi: true,
		},
	],
})
export class SelectComponent implements ControlValueAccessor, Validator, OnInit {
	@Input() label?: string;
	@Input() id?: string;
	@Input() options: any[] = [];
	@Input() optionLabel: string = "label";
	@Input() optionId: string|undefined = "value";
	@Input() required: boolean = false;
	@Input() loading: boolean = false;
	@Input() placeholder?: string;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	constructor(private injector: Injector) { }
	ngOnInit(): void {
		if(!this.id) {
			const ngControl: NgControl|null = this.injector.get(NgControl, null);
			this.id = ngControl?.name?.toString() || "invalid_id";
		}
	}

	public error: boolean = false;

	public valueEmit(): void {
		const val = this.value;
		this.valueChange.emit(val);
		this.onChange(val);
	}

	onChange = (delta: any) => {};

	writeValue(delta: any): void {
		this.value = delta;
	}

	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void { }

	validate(control: AbstractControl): ValidationErrors | null {
		if (!this.required) return null;
		if (!control.value) {
			this.error = true;
			return { required: true };
		}
		this.error = false;
		return null;
	}

}
