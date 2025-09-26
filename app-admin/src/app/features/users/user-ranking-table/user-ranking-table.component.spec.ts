import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRankingTableComponent } from './user-ranking-table.component';

describe('UserRankingTableComponent', () => {
  let component: UserRankingTableComponent;
  let fixture: ComponentFixture<UserRankingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRankingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRankingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
