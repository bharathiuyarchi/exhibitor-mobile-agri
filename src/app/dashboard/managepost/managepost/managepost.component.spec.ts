import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepostComponent } from './managepost.component';

describe('ManagepostComponent', () => {
  let component: ManagepostComponent;
  let fixture: ComponentFixture<ManagepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagepostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
