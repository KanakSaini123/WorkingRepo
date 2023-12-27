import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-ecomm';
  todos$: Observable<any[]> | undefined;
   cartLength = 0;
  constructor(private _router:Router,
    private heroService: ProductService ,
    private productService: ProductService ){
  }
  ngOnInit(): void {
    this.todos$ = this.productService.todos$;
   this.todos$.subscribe(result=> {
  
  if(result) {
    this.cartLength = result.length;
  }
})
  }
  onCheckout() {
    this._router.navigateByUrl('product-checkout');
  }
}
