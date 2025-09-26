import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploaderHomeComponent } from './media-uploader-home.component';

describe('MediaUploaderHomeComponent', () => {
  let component: MediaUploaderHomeComponent;
  let fixture: ComponentFixture<MediaUploaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploaderHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaUploaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
