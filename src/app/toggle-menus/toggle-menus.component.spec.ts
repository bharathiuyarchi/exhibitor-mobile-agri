import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMenusComponent } from './toggle-menus.component';

describe('ToggleMenusComponent', () => {
  let component: ToggleMenusComponent;
  let fixture: ComponentFixture<ToggleMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
