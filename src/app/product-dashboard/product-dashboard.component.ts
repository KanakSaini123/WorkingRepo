import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Options } from 'ngx-slider-v2';
import { ProductInfo } from '../model/product';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css',
})
export class ProductDashboardComponent implements OnInit {
  sortValue!: string;
  products: ProductInfo[] = [];
  // sort options
  sortTypes = [
    {
      name: 'price(high to low)',
      value: 'price,asc',
    },
    {
      name: 'price(low to high)',
      value: 'price,desc',
    },
    {
      name: 'name(a to z)',
      value: 'title,desc',
    },
    {
      name: 'name(z to a)',
      value: 'title,asc',
    },
  ];

  // filter options
  task = {
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
  // price range options
  options: Options = {
    floor: 0,
    ceil: 2000,
  };
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.products
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<ProductInfo[]>;
  categoryFilterOptions: string[] = [];
  selectedSortEvent!: string;
  selectedSortEventType!: string;
  value: number = 2000;
  allComplete: boolean = false;
  totalItems: number = 0;

  constructor(
    private _router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((result) => {
      this.products = result;
      const ids = this.products.map((object: ProductInfo) => {
        return object.price;
      });
      const max = Math.max(...ids);

      this.setListData(this.products);
    });
  }

  updateAllComplete(): void {
    this.categoryFilterOptions = [];
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
    this.task.subtasks.forEach((item) => {
      if (item.completed && !this.categoryFilterOptions.includes(item.name)) {
        this.categoryFilterOptions.push(item.name);
      }
      this.filterProductData();
    });
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean): void {
    this.categoryFilterOptions = [];
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));

    this.task.subtasks.forEach((item) => {
      if (item.completed) {
        this.categoryFilterOptions.push(item.name);
      }
    });

    this.filterProductData();
  }

  /**
   * This method set the product list data after each change detection
   * @returns void
   */
  setListData(productList: ProductInfo[]): void {
    this.totalItems = productList.length;
    this.dataSource = new MatTableDataSource<any>(productList);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  /**
   * This method sorts product based on selected event
   * @param region based on which facilities are flittered
   * @returns void
   */
  onSort(event: string): void {
    this.selectedSortEvent = event.split(',')[0];
    this.selectedSortEventType = event.split(',')[1];
    this.filterProductData();
  }

  /**
   * This method routes to product details page
   * @returns void
   */
  onCardClick(item: ProductInfo): void {
    this._router.navigateByUrl('product-details/' + item.id);
  }

  /**
   * This method filter and sort product data based on options
   * @returns void
   */
  filterProductData(): void {
    let product = this.products;
    if (this.categoryFilterOptions.length > 0) {
      let filterProduct = this.products.filter((item: { category: string }) =>
        this.categoryFilterOptions.includes(item.category)
      );
      product = filterProduct;
    }
    if (this.value) {
      product = product.filter(
        (item: { price: number }) => item.price <= this.value
      );
    }

    if (this.selectedSortEvent) {
      if (this.selectedSortEventType == 'asc') {
        product = product.sort((a: any, b: any) =>
          a[this.selectedSortEvent] > b[this.selectedSortEvent]
            ? -1
            : a[this.selectedSortEvent] > b[this.selectedSortEvent]
            ? 1
            : 0
        );
      }
      if (this.selectedSortEventType == 'desc') {
        product = product.sort((a: any, b: any) =>
          a[this.selectedSortEvent] < b[this.selectedSortEvent]
            ? -1
            : a[this.selectedSortEvent] < b[this.selectedSortEvent]
            ? 1
            : 0
        );
      }
    }

    this.setListData(product);
  }

  /**
   * This method changes the price range options
   * @returns void
   */
  onClickPriceChange(): void {
    this.filterProductData();
  }
}
