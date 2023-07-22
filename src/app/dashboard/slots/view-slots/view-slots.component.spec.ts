import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlotsComponent } from './view-slots.component';

describe('ViewSlotsComponent', () => {
  let component: ViewSlotsComponent;
  let fixture: ComponentFixture<ViewSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
