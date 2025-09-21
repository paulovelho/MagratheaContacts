import { CommonModule } from '@angular/common';
import { 
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
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-text',
  standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		InputTextareaModule,
		ReactiveFormsModule,
	],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: TextComponent,
			multi: true,
		},
	],
})
export class TextComponent implements ControlValueAccessor, Validator, OnInit {
	@Input() label: string = "";
	@Input() id: string = "";
	@Input() controlName: string = "";
	@Input() required: boolean = false;
	@Input() rows: number = 5;
	@Input() autoResize: boolean = true;
	@Input() disabled: boolean = false;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	public error: boolean = false;

	constructor(private injector: Injector) { }
	ngOnInit(): void {
		if(!this.id) {
			const ngControl: NgControl|null = this.injector.get(NgControl, null);
			this.id = ngControl?.name?.toString() || "invalid_id";
		}
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
