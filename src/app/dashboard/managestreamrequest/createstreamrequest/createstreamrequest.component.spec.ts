import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestreamrequestComponent } from './createstreamrequest.component';

describe('CreatestreamrequestComponent', () => {
  let component: CreatestreamrequestComponent;
  let fixture: ComponentFixture<CreatestreamrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatestreamrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestreamrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
