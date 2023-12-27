import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDashboardComponent } from './product-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSliderModule } from 'ngx-slider-v2';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ProductInfo } from '../model/product';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('ProductDashboardComponent', () => {
  let component: ProductDashboardComponent;
  let fixture: ComponentFixture<ProductDashboardComponent>;
  let location: Location;
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
      declarations: [ProductDashboardComponent],
      imports: [HttpClientTestingModule, MatRadioModule, MatCheckboxModule, NgxSliderModule, MatPaginatorModule, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDashboardComponent);
    component = fixture.componentInstance;
    component.selectedSortEvent = 'title';
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateAllComplete', () => {
    component.task = {
      name: 'Category',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'laptops', completed: false, color: 'primary' },
        { name: 'smartphones', completed: false, color: 'primary' },
        { name: 'fragrances', completed: false, color: 'primary' },
        { name: 'skincare', completed: false, color: 'primary' },
        { name: 'groceries', completed: false, color: 'primary' },
        { name: 'home-decoration', completed: false, color: 'primary' },
      ],
    };
    component.updateAllComplete();
    expect(component.updateAllComplete).toBeDefined();
  });

  it('should call setAll', () => {
    component.task = {
      name: 'Category',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'laptops', completed: false, color: 'primary' },
        { name: 'smartphones', completed: false, color: 'primary' },
        { name: 'fragrances', completed: false, color: 'primary' },
        { name: 'skincare', completed: false, color: 'primary' },
        { name: 'groceries', completed: false, color: 'primary' },
        { name: 'home-decoration', completed: false, color: 'primary' },
      ],
    };
    component.setAll(true);
    expect(component.setAll).toBeDefined();
  });


  it('should call onCardClick', () => {
    component.onCardClick(products[0]);
    expect(location.path).toBeDefined();
  });

  it('should call onSort', () => {
    component.onSort('test,asc');
    expect(component.onSort).toBeDefined();
  });

  it('should call onClickPriceChange', () => {
    component.onClickPriceChange();
    expect(component.onClickPriceChange).toBeDefined();
  });
});
