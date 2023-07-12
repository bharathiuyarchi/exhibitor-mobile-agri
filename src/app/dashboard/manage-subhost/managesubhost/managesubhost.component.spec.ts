import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubhostComponent } from './managesubhost.component';

describe('ManagesubhostComponent', () => {
  let component: ManagesubhostComponent;
  let fixture: ComponentFixture<ManagesubhostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagesubhostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagesubhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
