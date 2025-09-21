import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Block350300Component } from './block-350-300.component';

describe('Block350300Component', () => {
  let component: Block350300Component;
  let fixture: ComponentFixture<Block350300Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Block350300Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Block350300Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
