import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.css',
})
export class ModalSuccessComponent {
  constructor(public dialogRef: MatDialogRef<ModalSuccessComponent>,  private _router: Router) {}

  /**
   * This method is used to c close the success modal.
   */
  closeDialog() {
    this.dialogRef.close();
    this._router.navigateByUrl('dashboard');
  }
}
