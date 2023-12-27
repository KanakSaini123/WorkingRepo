import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { ProductInfo } from '../model/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  productDetails: any;
  todos$: Observable<ProductInfo[]> | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.todos$ = this.productService.todos$;
    this.route.params.subscribe((value) => {
      let productId = value['id'];
      if (productId) {
        this.productService
          .getAllProduct()
          .subscribe((result: ProductInfo[]) => {
            this.productDetails = result.find(
              (item: ProductInfo) => item.id == productId
            );
          });
      }
    });
  }

  /**
   * This method used to open success snackbar after successfull product add
   * @returns void
   */
  openSnackBar(panelClass: string): void {
    this.productService.create(this.productDetails);
    this._snackBar.open('item Added to cart !!!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [panelClass],
      duration: 2000,
    });
  }
}
