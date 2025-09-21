import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdLojasaladaComponent } from './ad-lojasalada.component';

describe('AdLojasaladaComponent', () => {
  let component: AdLojasaladaComponent;
  let fixture: ComponentFixture<AdLojasaladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdLojasaladaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdLojasaladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
