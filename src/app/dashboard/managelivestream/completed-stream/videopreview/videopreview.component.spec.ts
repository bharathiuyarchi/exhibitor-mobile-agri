import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopreviewComponent } from './videopreview.component';

describe('VideopreviewComponent', () => {
  let component: VideopreviewComponent;
  let fixture: ComponentFixture<VideopreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideopreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
