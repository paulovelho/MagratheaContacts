import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApikeyHomeComponent } from './apikey-home.component';

describe('ApikeyHomeComponent', () => {
  let component: ApikeyHomeComponent;
  let fixture: ComponentFixture<ApikeyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApikeyHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApikeyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
