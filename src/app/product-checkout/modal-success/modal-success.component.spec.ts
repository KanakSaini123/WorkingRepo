import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccessComponent } from './modal-success.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('ModalSuccessComponent', () => {
  let component: ModalSuccessComponent;
  let fixture: ComponentFixture<ModalSuccessComponent>;
  const dialogMock = {
    close: () => { }
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSuccessComponent],
      imports:[MatDialogModule, MatIconModule],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock}
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dialog should be closed after closeDialog()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.closeDialog();
    expect(spy).toHaveBeenCalled();    
  });
});
