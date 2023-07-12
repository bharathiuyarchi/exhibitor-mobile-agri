import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyregisterComponent } from './alreadyregister.component';

describe('AlreadyregisterComponent', () => {
  let component: AlreadyregisterComponent;
  let fixture: ComponentFixture<AlreadyregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
