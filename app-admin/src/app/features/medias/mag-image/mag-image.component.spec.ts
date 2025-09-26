import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagImageComponent } from './mag-image.component';

describe('MagImageComponent', () => {
  let component: MagImageComponent;
  let fixture: ComponentFixture<MagImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
