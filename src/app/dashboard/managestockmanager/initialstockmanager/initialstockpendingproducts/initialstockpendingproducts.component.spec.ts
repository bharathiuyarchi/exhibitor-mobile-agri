import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialstockpendingproductsComponent } from './initialstockpendingproducts.component';

describe('InitialstockpendingproductsComponent', () => {
  let component: InitialstockpendingproductsComponent;
  let fixture: ComponentFixture<InitialstockpendingproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialstockpendingproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialstockpendingproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
