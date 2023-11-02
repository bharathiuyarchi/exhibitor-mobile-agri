import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemostreamComponent } from './demostream.component';

describe('DemostreamComponent', () => {
  let component: DemostreamComponent;
  let fixture: ComponentFixture<DemostreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemostreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemostreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
