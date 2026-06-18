// last change: 2026-01-20

import { CommonModule } from '@angular/common';
import { 
	Component,
	ElementRef,
	EventEmitter,
	Injector,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
	forwardRef
} from '@angular/core';
import { 
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	NgControl,
	ReactiveFormsModule,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { PlatypusLoaderComponent } from "../../platypus-loader/platypus-loader.component";
import { AppSettings } from '@environments/app-settings';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    FloatLabel,
    PlatypusLoaderComponent,
],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: InputComponent,
			multi: true,
		},
	],
})
export class InputComponent implements ControlValueAccessor, Validator, OnInit, OnChanges {
	@ViewChild('inputEl') inputEl!: ElementRef;
	public floatPos = AppSettings.floatPosition;
	@Input() type: "text" | "password" | "disabled" | "number" | "email" | "color" | "hidden" | "date" | "time" | "datetime" = "text";

	public get nativeType(): string {
		return this.type === "datetime" ? "datetime-local" : this.type;
	}
	public get isDateType(): boolean {
		return this.type === "date" || this.type === "time" || this.type === "datetime";
	}
	@Input() label: string = "";
	@Input() translate: string = "";
	@Input() placeholder: string = "";
	@Input() id: string = "";
	@Input() required: boolean = false;
	@Input() autocomplete: string = "";
	@Input() extraClass: string = "";
	@Input() loading: boolean = false;
	@Input() disabled: boolean = false;

	@Input() value?: any;
	public dateValue: Date | null = null;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
	@Output() keyUp: EventEmitter<string> = new EventEmitter<string>();

	@Input() error: boolean = false;

	constructor(private injector: Injector) { }
	ngOnInit(): void {
		if(!this.id) {
			const ngControl: NgControl|null = this.injector.get(NgControl, null);
			this.id = ngControl?.name?.toString() || "invalid_id";
		}
		if(!this.autocomplete) this.autocomplete = this.id;
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.isDateType && (changes['value'] || changes['type'])) {
			this.dateValue = this.parseDateValue(this.value);
		}
	}

	public get nativeElement(): HTMLInputElement {
		return this.inputEl.nativeElement;
	}

	public valueEmit(): void {
		this.valueChange.emit(this.value);
		this.onChange(this.value);
	}

	public onDateValueChange(date: Date | null): void {
		this.dateValue = date;
		this.value = this.formatDateValue(date);
		this.valueEmit();
	}

	// keeps the outside API as strings, in the same formats the native
	// date/time/datetime-local inputs used to emit
	private parseDateValue(value: any): Date | null {
		if (!value) return null;
		if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
		const raw = String(value).trim();
		if (this.type === "time") {
			const [hours, minutes, seconds] = raw.split(":").map(Number);
			if (isNaN(hours)) return null;
			const date = new Date();
			date.setHours(hours, minutes || 0, seconds || 0, 0);
			return date;
		}
		const normalized = raw.replace(" ", "T");
		const date = new Date(normalized.length === 10 ? `${normalized}T00:00:00` : normalized);
		return isNaN(date.getTime()) ? null : date;
	}

	private formatDateValue(date: Date | null): string | null {
		if (!date) return null;
		const pad = (n: number) => String(n).padStart(2, "0");
		const datePart = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
		const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
		switch (this.type) {
			case "date": return datePart;
			case "time": return timePart;
			default: return `${datePart}T${timePart}`;
		}
	}

	public onKeyup(event: KeyboardEvent): void {
		this.keyUp.emit((event.target as HTMLInputElement).value);
	}

	writeValue(delta: any): void {
		this.value = delta;
		if (this.isDateType) this.dateValue = this.parseDateValue(delta);
	}

	onChange = (delta: any) => { };
	onTouched = () => {
	};
	registerOnChange(fn: (v: any) => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

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
