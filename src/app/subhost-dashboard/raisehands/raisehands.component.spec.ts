import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisehandsComponent } from './raisehands.component';

describe('RaisehandsComponent', () => {
  let component: RaisehandsComponent;
  let fixture: ComponentFixture<RaisehandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisehandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaisehandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
