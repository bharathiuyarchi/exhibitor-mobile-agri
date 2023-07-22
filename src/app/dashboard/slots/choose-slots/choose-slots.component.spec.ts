import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSlotsComponent } from './choose-slots.component';

describe('ChooseSlotsComponent', () => {
  let component: ChooseSlotsComponent;
  let fixture: ComponentFixture<ChooseSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
