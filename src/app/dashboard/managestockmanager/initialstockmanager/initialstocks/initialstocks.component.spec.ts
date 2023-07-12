import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialstocksComponent } from './initialstocks.component';

describe('InitialstocksComponent', () => {
  let component: InitialstocksComponent;
  let fixture: ComponentFixture<InitialstocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialstocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
