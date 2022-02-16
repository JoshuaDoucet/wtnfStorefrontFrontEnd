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
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductsInUsersCart();
  }

  getProductsInUsersCart(): void{
    this.cartService.getCart().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.updateCartPrice();
    })
  }

  removeProduct(cartItem: CartItem): void {
    this.cartItems = this.cartItems.filter(item => 
      item.product_id + "" !== cartItem.product_id + ""
    );
    this.updateCartPrice();
    alert(`Product with ID# ${cartItem.product_id} removed from cart.`);
  }

  updateProdQuantity(cartItem: CartItem): void {
    for(let i = 0; i < this.cartItems.length; i++){
      if(this.cartItems[i].product_id + "" == cartItem.product_id + ""){
        this.cartItems[i].product_quantity = cartItem.product_quantity;
      }
    }
    this.updateCartPrice();
    alert(`Quantity for product with ID# ${cartItem.product_id} updated in cart.`);
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
