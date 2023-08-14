import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamOrdersComponent } from './stream-orders.component';

describe('StreamOrdersComponent', () => {
  let component: StreamOrdersComponent;
  let fixture: ComponentFixture<StreamOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
