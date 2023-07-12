import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHostComponent } from './assign-host.component';

describe('AssignHostComponent', () => {
  let component: AssignHostComponent;
  let fixture: ComponentFixture<AssignHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
