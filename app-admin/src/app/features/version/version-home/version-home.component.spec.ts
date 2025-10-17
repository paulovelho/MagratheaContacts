import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionHomeComponent } from './version-home.component';

describe('VersionHomeComponent', () => {
  let component: VersionHomeComponent;
  let fixture: ComponentFixture<VersionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
