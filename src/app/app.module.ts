import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

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
import { NavigationComponent } from './components/navigation/navigation.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupComponent } from './components/signup/signup.component';

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
    OrderConfirmComponent,
    NavigationComponent,
    SigninComponent,
    UserProfileComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
