import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfirmationComponent } from './user-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserConfirmationComponent', () => {
  let component: UserConfirmationComponent;
  let fixture: ComponentFixture<UserConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserConfirmationComponent],
      imports: [ReactiveFormsModule ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onsubmit', () => {
   component.submit();
   expect(component.submit).toBeDefined();
  });
});
