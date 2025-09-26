import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBulletComponent } from './active-bullet.component';

describe('ActiveBulletComponent', () => {
  let component: ActiveBulletComponent;
  let fixture: ComponentFixture<ActiveBulletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveBulletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveBulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
