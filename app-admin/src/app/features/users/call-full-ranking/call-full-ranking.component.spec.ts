import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFullRankingComponent } from './call-full-ranking.component';

describe('CallFullRankingComponent', () => {
  let component: CallFullRankingComponent;
  let fixture: ComponentFixture<CallFullRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallFullRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallFullRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
