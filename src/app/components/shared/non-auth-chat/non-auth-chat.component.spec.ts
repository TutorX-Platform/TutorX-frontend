import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthChatComponent } from './non-auth-chat.component';

describe('NonAuthChatComponent', () => {
  let component: NonAuthChatComponent;
  let fixture: ComponentFixture<NonAuthChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
