import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.css']
})
export class ProductCartItemComponent implements OnInit {
  @Input() cartItem: CartItem = new CartItem();
  @Output() removeProductEmit: EventEmitter<CartItem> = new EventEmitter();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  removeProduct(): void {
    console.log(this.cartItem)
    if(this.cartItem.product_id){
      this.cartService.removeProductFromCart(this.cartItem.product_id + "").subscribe({
        error: (err) => {
          alert(`Product not removed from cart. ` + err)
        },
        next: (cartItem) => { 
          console.log(cartItem);
          this.removeProductEmit.emit(cartItem);
        }
      });
    }else{
      alert("Cannot find product ID. Item not removed from cart.")
    }
  }

}
