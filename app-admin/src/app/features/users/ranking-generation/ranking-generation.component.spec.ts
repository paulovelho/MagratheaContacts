import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGenerationComponent } from './ranking-generation.component';

describe('RankingGenerationComponent', () => {
  let component: RankingGenerationComponent;
  let fixture: ComponentFixture<RankingGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
