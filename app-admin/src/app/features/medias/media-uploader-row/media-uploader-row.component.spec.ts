import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploaderRowComponent } from './media-uploader-row.component';

describe('MediaUploaderRowComponent', () => {
  let component: MediaUploaderRowComponent;
  let fixture: ComponentFixture<MediaUploaderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUploaderRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaUploaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
