import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionMobileComponent } from './add-question-mobile.component';

describe('AddQuestionMobileComponent', () => {
  let component: AddQuestionMobileComponent;
  let fixture: ComponentFixture<AddQuestionMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
