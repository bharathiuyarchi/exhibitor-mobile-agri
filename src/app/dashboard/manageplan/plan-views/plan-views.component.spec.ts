import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanViewsComponent } from './plan-views.component';

describe('PlanViewsComponent', () => {
  let component: PlanViewsComponent;
  let fixture: ComponentFixture<PlanViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
