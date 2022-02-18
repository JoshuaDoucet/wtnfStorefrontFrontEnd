// Product cart item Component
// Displays information about a product in an order with the ability
// to remove the product or change the product quantity in the cart

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem, CartItemSimple } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.css']
})
export class ProductCartItemComponent implements OnInit {
  @Input() cartItem: CartItem = new CartItem();
  @Output() removeProductEmit: EventEmitter<CartItemSimple> = new EventEmitter();
  @Output() updateProductEmit: EventEmitter<CartItemSimple> = new EventEmitter();
  quantity: number = 0;
  subTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartItem.product_quantity;
    this.subTotal = this.cartItem.product_quantity * this.cartItem.price;
  }

  onChangeEvent(quantity: number){
    if(quantity < 1){
      alert("Quantity must be at least 1");
      this.quantity = this.cartItem.product_quantity;
    } else if(quantity != Math.floor(quantity)){
      alert("Quantity must be a whole number.")
    }
    else if(quantity <= this.cartItem.boh){
      this.cartItem.product_quantity = quantity;
      this.quantity = this.cartItem.product_quantity;
      this.subTotal = this.cartItem.product_quantity * this.cartItem.price;
      this.updateProdQuantity();
    }else{
      alert("Quantity exceed quantity available.");
      this.quantity = this.cartItem.product_quantity;
    }

  }

  updateProdQuantity(): void {
    if(this.cartItem.product_id){
      this.cartService.updateProductQuantityInCart(this.cartItem.product_id + "", 
        this.cartItem.product_quantity).subscribe({
        error: (err) => {
          alert(`Product quantity not updated in cart. ` + err)
        },
        next: (cartItem) => { 
          this.updateProductEmit.emit(cartItem);
        }
      });
    }else{
      alert("Cannot find product ID. Item quantity not updated in cart.")
    }
  }

  removeProduct(): void {
    if(this.cartItem.product_id){
      this.cartService.removeProductFromCart(this.cartItem.product_id + "").subscribe({
        error: (err) => {
          alert(`Product not removed from cart. ` + err)
        },
        next: (cartItem) => { 
          this.removeProductEmit.emit(cartItem);
        }
      });
    }else{
      alert("Cannot find product ID. Item not removed from cart.")
    }
  }

}
