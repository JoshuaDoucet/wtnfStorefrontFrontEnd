import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {
  //products in the cart for the logged in user
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductsInUsersCart();
  }

  getProductsInUsersCart(): void{
    this.cartService.getCart().subscribe(cartItems => {
      this.cartItems = cartItems;
    })
  }
}
