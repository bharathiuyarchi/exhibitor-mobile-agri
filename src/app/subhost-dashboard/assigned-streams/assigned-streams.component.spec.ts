import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedStreamsComponent } from './assigned-streams.component';

describe('AssignedStreamsComponent', () => {
  let component: AssignedStreamsComponent;
  let fixture: ComponentFixture<AssignedStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedStreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
