import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ModalSuccessComponent } from './product-checkout/modal-success/modal-success.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from 'ngx-slider-v2';
import { ReactiveFormsModule } from '@angular/forms';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductDashboardComponent,
    ProductDetailsComponent,
    ModalSuccessComponent,
    ProductCheckoutComponent,
    UserConfirmationComponent
    
  ],
  imports: [
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogTitle, 
    ReactiveFormsModule,
    MatDialogContent,
    NgxSliderModule,
    BrowserAnimationsModule,

    HttpClientModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
