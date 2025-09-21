import { CommonModule } from '@angular/common';
import { 
	AfterViewInit,
	Component,
	EventEmitter,
	Injector,
	Input,
	OnInit,
	Output,
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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
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
export class InputComponent implements ControlValueAccessor, Validator, OnInit {
	@Input() type: string = "text";
	@Input() label: string|null = null;
	@Input() placeholder: string|null = null;
	@Input() id: string = "";
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Input() autocomplete: string = "";
	@Input() extraClass: string = "";
	@Input() preIcon: string|null = null;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
	@Output() focusOut: EventEmitter<string> = new EventEmitter<string>();

	@Input() error: boolean = false;

	constructor(private injector: Injector) { }
	ngOnInit(): void {
		if(!this.id) {
			const ngControl: NgControl|null = this.injector.get(NgControl, null);
			this.id = ngControl?.name?.toString() || "invalid_id";
		}
		if(!this.autocomplete) this.autocomplete = this.id;
	}

	public valueEmit(): void {
		this.valueChange.emit(this.value);
		this.onChange(this.value);
	}

	writeValue(delta: any): void {
		this.value = delta;
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

	leaveFocus = () => this.focusOut.emit(this.value);

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
