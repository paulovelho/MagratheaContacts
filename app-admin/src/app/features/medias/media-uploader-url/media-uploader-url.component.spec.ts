import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploaderUrlComponent } from './media-uploader-url.component';

describe('MediaUploaderUrlComponent', () => {
  let component: MediaUploaderUrlComponent;
  let fixture: ComponentFixture<MediaUploaderUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploaderUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaUploaderUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
