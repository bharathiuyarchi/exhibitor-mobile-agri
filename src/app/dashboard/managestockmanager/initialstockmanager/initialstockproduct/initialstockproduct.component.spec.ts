import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialstockproductComponent } from './initialstockproduct.component';

describe('InitialstockproductComponent', () => {
  let component: InitialstockproductComponent;
  let fixture: ComponentFixture<InitialstockproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialstockproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialstockproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
