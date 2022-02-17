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
  @Output() updateProductEmit: EventEmitter<CartItem> = new EventEmitter();
  quantity: number = 0;
  subTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.quantity = this.cartItem.product_quantity;
    this.subTotal = this.cartItem.product_quantity * this.cartItem.price;
  }

  onChangeEvent(event: any){
    if(event.target.value < 1){
      alert("Quantity must be at least 1");
      this.quantity = this.cartItem.product_quantity;
    } else if(event.target.value != Math.floor(event.target.value)){
      alert("Quantity must be a whole number.")
    }
    else if(event.target.value <= this.cartItem.boh){
      this.cartItem.product_quantity = event.target.value;
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
          console.log(cartItem);
          this.removeProductEmit.emit(cartItem);
        }
      });
    }else{
      alert("Cannot find product ID. Item not removed from cart.")
    }
  }

}
