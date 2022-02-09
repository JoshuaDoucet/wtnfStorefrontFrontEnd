import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductCartItemComponent } from './components/product-cart-item/product-cart-item.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListItemComponent,
    ProductCartItemComponent,
    CartComponent,
    ProductDetailsComponent,
    CartProductsComponent,
    CartCheckoutComponent,
    OrderConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
