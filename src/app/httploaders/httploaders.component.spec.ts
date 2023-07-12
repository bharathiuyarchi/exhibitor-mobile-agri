import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttploadersComponent } from './httploaders.component';

describe('HttploadersComponent', () => {
  let component: HttploadersComponent;
  let fixture: ComponentFixture<HttploadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttploadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttploadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
