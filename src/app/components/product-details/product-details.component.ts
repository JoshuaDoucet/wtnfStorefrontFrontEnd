import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { ProductDetailsService } from 'src/app/services/product-details/product-details.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  apiHost: string | null = null;
  product: Product;
  product_id: string = "";
  quantity: number = 1;
  image_paths: string[] = [];
  color_names: string[] = [];
  material_names: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private configurationService: ConfigurationService,
              private productDetailsService: ProductDetailsService) {
    //Get product state from router
    const navigation = this.router.getCurrentNavigation();
    // If product data provided from state use that.
    if(navigation && navigation != null && 
      navigation.extras && navigation.extras.state){
        const product: Product = navigation.extras.state['product'];
        this.product = product;
    }
    // Else product data not provided from state, create a new one.
    else{
      this.product = new Product();
    }  
  }

  ngOnInit(): void {
    this.apiHost = this.configurationService.getApiHost();
    //If the route was visited with product state data
    if(this.product.id != "-1"){
      //Update component product_id
      this.product_id = (this.product.id as unknown) as string;
      //Get product details from tables related to product
      this.getProductForeignRelations();
    }else{
      // if route reached without product state, fetch product from API
      this.getProductDetails();
    }
  }

  getProductDetails(){
    // get product id from URL param
    this.route.params.subscribe(params=>{
      this.product_id = params['id'];
      // get product for details page
      this.getProductResource(this.product_id);
    })
  }

  getProductResource(product_id: string){
    this.productDetailsService.getProduct(this.product_id).subscribe({
      error: (err) => {this.product.id = undefined; console.log("ERROR:" + err)},
      next: (product) => {
        this.product = product;
        // get product details from other linking tables
        this.getProductForeignRelations();
      }
    });
  }

  getProductForeignRelations(){
        // get image URLs
        this.getImageUrls();
        // get product color names
        this.getColorNames();
        // get product material names
        this.getMaterialNames();
  }

  getImageUrls(){
    if(this.product.image_ids){
      this.image_paths = this.productDetailsService.getProductImageUrls(this.product.image_ids);
    }
  }

  getColorNames(){
    if(this.product.color_ids){
      for(let i = 0; i < this.product.color_ids.length; i++){
        this.productDetailsService.getColor(this.product.color_ids[i])
          .subscribe(color =>{
            if(color.name){
              this.color_names.push(color.name);
            }
          });
      }
    }
  }

  getMaterialNames(){
    if(this.product.material_ids){
      for(let i = 0; i < this.product.material_ids.length; i++){
        this.productDetailsService.getMaterial(this.product.material_ids[i])
          .subscribe(material =>{
            if(material.name){
              this.material_names.push(material.name);
            }
          });
      }
    }
  }

  
  addToCart(){
    if(this.product.id && localStorage.getItem('userId')){
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
          //update product quantity in cart
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
    }else{
      alert("Sign-in to add to cart.")
    }
  }
}
