import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ImageLink } from '../links.class';


@Component({
  selector: 'mag-image',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './mag-image.component.html',
  styleUrl: './mag-image.component.scss',
	host: { '(click)': 'handleClick($event)'}
})
export class MagImageComponent implements OnInit, OnChanges {
	@Input() id: any|null = null;
	@Input() width?: number;
	@Input() height?: number;
	@Input() size?: string;
	@Input() extraClass: string|string[] = "";
	@Input() alt: string = "";
	@Input() mock: boolean = false;
	@Output() onClick: EventEmitter<any> = new EventEmitter<any>();

	public imgLoaded: boolean = false;
	public imageUrl?: string;
	public placeholderUrl?: string;

	constructor(
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		this.buildPlaceholderUrl();
		this.buildUrl();
	}

	ngOnInit(): void {
		if(!this.size) {
			if(!this.width || !this.height) this.size = "thumb";
			else this.size = this.width + "x" + this.height;
		}
		if(this.mock) this.getMockImageUrl();
		else {
			this.buildPlaceholderUrl();
			this.buildUrl();
		}
	}

	public buildUrl() {
		this.imageUrl = ImageLink.getLink(this.id, this.size!);
	}
	public buildPlaceholderUrl() {
		this.placeholderUrl = ImageLink.getLink(this.id, this.size!, true);
	}

	public getAlt(): string {
		if(this.alt) return this.alt;
		else return "image "+this.id;
	}

	public getMockImageUrl() {
		let txt: string = this.id == null ? "X" :  "id-"+this.id;
		const s = this.size ?? "thumb";
		let dimensions: string = s == "thumb" ? "100x100" : s;
		let bgColor = "8f7000";
		let textColor = "0f095e";
		this.imageUrl = `https://dummyimage.com/${dimensions}/${bgColor}/${textColor}&text=${txt}`;
		return this.imageUrl;
	}

	public loadComplete() {
		this.imgLoaded = true;
	}

	public handleClick(e: any) {
		console.info(e);
		this.onClick.emit(e);
	}

}
