import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorQuestionsComponent } from './tutor-questions.component';

describe('TutorQuestionsComponent', () => {
  let component: TutorQuestionsComponent;
  let fixture: ComponentFixture<TutorQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
