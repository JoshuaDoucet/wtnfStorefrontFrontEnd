import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: "", component: ProductsComponent},
  {path: "cart", component: CartComponent},
  {path: "products", component: ProductsComponent},
  {path: "products/:id", component: ProductDetailsComponent},
  {path: "signin", component: SigninComponent},
  {path: "profile", component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
