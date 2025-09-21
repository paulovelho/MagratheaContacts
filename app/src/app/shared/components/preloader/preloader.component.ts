import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
	standalone: true,
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
	imports: [ CommonModule, ],
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  // Loader
  public isLoading: boolean = true;
  constructor() { }

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }

}
