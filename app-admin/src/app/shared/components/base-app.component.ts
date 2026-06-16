import { ChangeDetectorRef, inject } from "@angular/core";

export class BaseAppComponent {
	public loading:boolean = false;
	public cdr = inject(ChangeDetectorRef);
	constructor(
	) { }

	public setLoading(l:boolean, update:boolean=true): void {
		this.loading = l;
		if(!update) return;
		this.cdr.detectChanges();
	}
}
