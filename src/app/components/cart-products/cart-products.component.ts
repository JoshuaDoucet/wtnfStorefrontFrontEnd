// Cart products component
// A parent component that holds a list of all products in the cart for a given user

import { Component, OnInit } from '@angular/core';
import { CartItem, CartItemSimple} from 'src/app/models/cartItem';
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
  totalPrice: number = 0;
  orderNumber: string = "";

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductsInUsersCart();
  }

  getProductsInUsersCart(): void{
    this.cartService.getCart().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.updateCartPrice();
      const orderNumber = localStorage.getItem("activeOrdId"); 
      if(orderNumber){
        this.orderNumber = orderNumber;
      }
    })
  }

  removeProduct(cartItem: CartItemSimple): void {
    this.cartItems = this.cartItems.filter(item => {
      if(item.product_id && cartItem.product_id){
        return (item.product_id + "" !== cartItem.product_id + "")
      }else{
        return false
      }
    }
    );
    this.updateCartPrice();
    alert(`Product with ID# ${cartItem.product_id} removed from cart.`);
  }

  updateProdQuantity(cartItem: CartItemSimple): void {
    for(let i = 0; i < this.cartItems.length; i++){
      if(this.cartItems[i].product_id + "" == cartItem.product_id + ""){
        this.cartItems[i].product_quantity = cartItem.product_quantity;
      }
    }
    this.updateCartPrice();
    alert(`Cart qty for product ID# ${cartItem.product_id} updated .`);
  }

  updateCartPrice(){
    this.totalPrice = 0;
    for(let i = 0; i < this.cartItems.length; i++){
      if(this.cartItems[i] && this.cartItems[i].price && this.cartItems[i].product_quantity){
        this.totalPrice += this.cartItems[i].price * this.cartItems[i].product_quantity;
      }
    }
  }
}
