import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorActivitiesComponent } from './tutor-activities.component';

describe('TutorActivitiesComponent', () => {
  let component: TutorActivitiesComponent;
  let fixture: ComponentFixture<TutorActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
