import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasApiComponent } from './medias-api.component';

describe('MediasApiComponent', () => {
  let component: MediasApiComponent;
  let fixture: ComponentFixture<MediasApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediasApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediasApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
