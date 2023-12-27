import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from "@angular/router/testing";
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, async, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo } from '../model/product';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductService;
  let snackBar: MatSnackBar;
  const mockActiveRoute = {
    params: of({ id: '1' })
  };
  
  let products :ProductInfo []= [
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
      declarations: [ProductDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule],
      providers: [
        { provide: ProductService},
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: ActivatedRoute, useValue: mockActiveRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('test')
    expect(component.openSnackBar).toBeDefined();
  });



});
