import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepoststockComponent } from './managepoststock.component';

describe('ManagepoststockComponent', () => {
  let component: ManagepoststockComponent;
  let fixture: ComponentFixture<ManagepoststockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepoststockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagepoststockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
