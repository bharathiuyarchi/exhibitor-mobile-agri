import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostapproveComponent } from './postapprove.component';

describe('PostapproveComponent', () => {
  let component: PostapproveComponent;
  let fixture: ComponentFixture<PostapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
