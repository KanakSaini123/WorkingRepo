import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCheckoutComponent } from './product-checkout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { ProductInfo } from '../model/product';
import { Location } from '@angular/common';

describe('ProductCheckoutComponent', () => {
  let component: ProductCheckoutComponent;
  let fixture: ComponentFixture<ProductCheckoutComponent>;
  let location: Location;
  let products: ProductInfo[] = [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "Smartphones",
      "checked": false,
      "quantity": 3,
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",

      ]

    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCheckoutComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCheckoutComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    component.cartProductDetails = products;
    expect(component.ngOnInit).toBeDefined();
  });

  it('open dialog success modal', () => {
       component.onClickBuy();
    expect(component.onClickBuy).toBeDefined();

  });

  it('should call onClickContinue', () => {
    component.onClickContinue();
    expect(location.path).toBeDefined();
  });

  it('should set removeFromCart', () => {
    component.removeFromCart(products[0]);
    expect(component.removeFromCart).toBeDefined();
  });

  it('should set onClickCheckbox', () => {
    component.onClickCheckbox(products[0]);
    expect(component.disabledButton).toEqual(true);
  });

  it('should update object ', () => {
    let result = component.updateObject(products);
    expect(result.length).toEqual(1);
  });

  it('should update object with duplicate item ', () => {
    let mockObject = products[0];
    products.push(mockObject)
    let result = component.updateObject(products);
    expect(result.length).toEqual(1);
  });
});
