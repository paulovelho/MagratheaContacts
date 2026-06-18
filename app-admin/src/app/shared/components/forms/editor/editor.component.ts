// last update: 2026-01
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
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { AppSettings } from '@environments/app-settings';

@Component({
  selector: 'app-editor',
  standalone: true,
	imports: [
		CommonModule,
		EditorModule,
		FormsModule,
		InputTextModule,
		TextareaModule,
		ReactiveFormsModule,
		FloatLabel,
	],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => EditorComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: EditorComponent,
			multi: true,
		},
	],
})
export class EditorComponent implements ControlValueAccessor, Validator, OnInit {
	@Input() label: string = "";
	@Input() id: string = "";
	@Input() controlName: string = "";
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() height: number = 300;

	@Input() value?: any;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	public error: boolean = false;
	public floatPos = AppSettings.floatPosition;

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
