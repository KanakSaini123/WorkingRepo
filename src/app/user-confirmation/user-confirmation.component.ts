import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccessComponent } from '../product-checkout/modal-success/modal-success.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrl: './user-confirmation.component.css',
})
export class UserConfirmationComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    body: new FormControl('', Validators.required),
  });

  constructor(public dialog: MatDialog) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.dialog.open(ModalSuccessComponent, {});
    }
  }
}
