import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBlock1Component } from './ad-block1.component';

describe('AdBlock1Component', () => {
  let component: AdBlock1Component;
  let fixture: ComponentFixture<AdBlock1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdBlock1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdBlock1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
