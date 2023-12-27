import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductInfo } from '../model/product';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrl: './product-checkout.component.css',
})
export class ProductCheckoutComponent implements OnInit {
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  isCheckout = true;
  cartProductDetails: ProductInfo[] = [];
  todos$: Observable<any[]> | undefined;
  totalCartValue = 0;
  disabledButton = true;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.todos$ = this.productService.todos$;
    this.todos$.subscribe((result) => {
      result = this.updateObject(result);

      if (result) {
        this.cartProductDetails = result;
        this.cartProductDetails.forEach((item) => (item.checked = false));
      }
    });
  }

  /**
   * This method is used to check duplicate added object and set quantity of each product.
   */
  updateObject(result: ProductInfo[]): ProductInfo[] {
    let dupObject: ProductInfo[] = [];

    result = result.reduce((acc: ProductInfo[], item) => {
      if (!acc.some((obj: ProductInfo) => obj.id === item.id)) {
        item.quantity = 0;
        acc.push(item);
      } else {
        dupObject.push(item);
      }
      return acc;
    }, []);

    dupObject.forEach((item) => {
      const index = result.findIndex(
        (data: { id: any }) => data.id === item.id
      );
      if (index > -1) {
        result[index].quantity = result[index].quantity + 1;
      }
    });
    return result;
  }

  /**
   * This method set condition for checkout button enable
   * @param region based on which facilities are flittered
   * @returns void
   */
  onClickCheckbox(item: ProductInfo): void {
    item.checked = !item.checked;
    let checkoutProduct = this.cartProductDetails.filter(
      (item) => item.checked === true
    );
    this.totalCartValue = checkoutProduct.reduce(
      (acc, val) => (acc += val.price * (val.quantity + 1)),
      0
    );
    this.disabledButton = this.cartProductDetails.find(
      (item) => item.checked === true
    )
      ? false
      : true;
  }

  /**
   * This method is used to remove item from cart.
   */
  removeFromCart(item: ProductInfo): void {
    this.productService.remove(item.id);
    this.todos$ = this.productService.todos$;
  }

  /**
   * This method is used to redirect to dashboard.
   */
  onClickContinue(): void {
    this._router.navigateByUrl('dashboard');
  }

  /**
   * This method is used to open success modal.
   */
  onClickBuy(): void {
    let checkoutProduct = this.cartProductDetails.filter(
      (item) => item.checked === true
    );
    this.totalCartValue = 0;
    checkoutProduct.forEach((item) => this.productService.remove(item.id));
    this._router.navigateByUrl('user-confirmation');
  }
}
