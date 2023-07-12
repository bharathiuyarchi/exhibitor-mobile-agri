import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntimationbuyermanagerComponent } from './intimationbuyermanager.component';

describe('IntimationbuyermanagerComponent', () => {
  let component: IntimationbuyermanagerComponent;
  let fixture: ComponentFixture<IntimationbuyermanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntimationbuyermanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntimationbuyermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
