import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerviewComponent } from './buyerview.component';

describe('BuyerviewComponent', () => {
  let component: BuyerviewComponent;
  let fixture: ComponentFixture<BuyerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
