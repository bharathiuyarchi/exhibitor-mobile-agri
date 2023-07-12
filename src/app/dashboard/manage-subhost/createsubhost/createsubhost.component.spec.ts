import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesubhostComponent } from './createsubhost.component';

describe('CreatesubhostComponent', () => {
  let component: CreatesubhostComponent;
  let fixture: ComponentFixture<CreatesubhostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesubhostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesubhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
