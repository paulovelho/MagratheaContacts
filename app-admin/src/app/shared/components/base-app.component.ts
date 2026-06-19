// last change: 2025-12-26
import { ChangeDetectorRef, inject, Input, Component, Output, EventEmitter } from "@angular/core";

@Component({ template: '' })
export abstract class BaseAppComponent {
	@Input() loading: boolean = false;
	@Output() onLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	public cdr = inject(ChangeDetectorRef);

	constructor( ) { }

	public setLoading(l:boolean, update:boolean=true): void {
		this.loading = l;
		this.onLoadingChange.emit(l);
		if(!update) return;
		this.cdr.detectChanges();
	}

	public refresh = () => this.cdr.detectChanges();
}
