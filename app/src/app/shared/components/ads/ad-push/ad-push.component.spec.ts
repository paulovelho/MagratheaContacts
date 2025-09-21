import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPushComponent } from './ad-push.component';

describe('AdPushComponent', () => {
  let component: AdPushComponent;
  let fixture: ComponentFixture<AdPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdPushComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
