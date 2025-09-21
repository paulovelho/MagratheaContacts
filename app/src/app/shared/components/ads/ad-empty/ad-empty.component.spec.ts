import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEmptyComponent } from './ad-empty.component';

describe('AdEmptyComponent', () => {
  let component: AdEmptyComponent;
  let fixture: ComponentFixture<AdEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
