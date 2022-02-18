// Products list item Component
//Displays a few details about a single product within the products list
// with the ability to add the product to the cart

import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})

export class ProductListItemComponent implements OnInit {
  // product is an Input from parent component ProductsComponent
  @Input() product: Product = new Product();
  quantity: number = 1;
  apiHost: string | null = null;

  constructor(private router: Router,
              private congfigurationService: ConfigurationService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.apiHost = this.congfigurationService.getApiHost();
  }

  // this redirects to the product-details component amd
  // and sends the product as state data
  viewDetails() {
    let route = `/products/${this.product.id}`;
    this.router.navigate([route], {
      state: {
        product: this.product
      }
    });
  }

  addToCart(){
    if(this.product.id && localStorage.getItem('userId') != null){
      if(this.quantity < 1){
        alert("Quantity must be greater than 0")
      } else if(this.quantity !== Math.floor(this.quantity)){
        alert("Quantity must be a whole number.")
      }else{
        // get items already in cart
        this.cartService.getCart().subscribe({
          error: (err) => {alert("Sign-In to add items to cart. ");},
          next: (cartItems) => {
            let isProdInCart = false;
            let prodIndex = -1;
            // check if product being added is already in cart
            for(let i = 0; i < cartItems.length; i++){
              // if product already in cart, set flag and break loop
              if(this.product.id && cartItems[i].product_id +"" == this.product.id){
                isProdInCart = true;
                prodIndex = i;
                break;
              }
            }
            //update product quantity in car
            if(isProdInCart){
              //if added quantity is less than balance on hand boh update quantity
              if(this.product.boh && this.product.id
                && cartItems[prodIndex].product_quantity + this.quantity <= this.product.boh){
                // update product quantity in cart
                this.cartService.updateProductQuantityInCart(this.product.id, this.quantity)
                .subscribe({
                  error: (err) => {alert("Product quantity NOT updated in cart.")},
                  next: (cartItem) => {alert("Product quantity updated in cart.");}
                });
              }else{
                alert("Quantity exceed quantity available.")
              }
            }
            // else product not in cart, add to cart
            else{
              if(this.product.id){
                this.cartService.addProductToCart(this.product.id, this.quantity)
                .subscribe({
                  error: (err) => {alert("Product NOT added to cart.")},
                  next: (cartItem) => {alert("Product added to cart.");}
                });
              }else{
                alert("Product Id not found. Cannot add to cart.")
              }
            }
          }
        });
      }
    }else{
      alert("Sign-in to add to cart.")
    }
  }
}
