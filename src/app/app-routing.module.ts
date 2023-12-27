import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: ProductDashboardComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'product-checkout',
    component: ProductCheckoutComponent,
  },
  {
    path: 'user-confirmation',
    component: UserConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
