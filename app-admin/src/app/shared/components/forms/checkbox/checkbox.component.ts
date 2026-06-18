// last change: 2025-12
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	NgControl,
	ReactiveFormsModule,
	ValidationErrors,
	Validator
} from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CheckboxModule,
		ToggleSwitch,
	],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: CheckboxComponent,
			multi: true,
		},
	]
})
export class CheckboxComponent implements ControlValueAccessor, Validator, OnInit {
	@Input({ required: true }) id!: string;
	@Input() label: string = "";
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() extraClass: string = "";
	@Input() switch: boolean = false;

	@Input() checked?: boolean = false;
	@Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private injector: Injector) { }
	ngOnInit(): void {
		if(!this.id) {
			const ngControl: NgControl|null = this.injector.get(NgControl, null);
			this.id = ngControl?.name?.toString() || "invalid_id";
		}
	}
	public error: boolean = false;

	public checkedEmit(): void {
		this.checkedChange.emit(this.checked);
		this.onChange(this.checked);
	}

	onChange = (delta: any) => {};
	writeValue(delta: any): void {
		this.checked = delta;
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

	toggle(): void {
		this.checked = !this.checked;
		this.checkedEmit();
	}

}
