import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubuserComponent } from './managesubuser.component';

describe('ManagesubuserComponent', () => {
  let component: ManagesubuserComponent;
  let fixture: ComponentFixture<ManagesubuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagesubuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagesubuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
