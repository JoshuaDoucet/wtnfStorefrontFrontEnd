import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from 'src/app/models/product';
import { ProductDetailsService } from 'src/app/services/product-details/product-details.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = new Product();;
  product_id: string = "";
  image_paths: string[] = [];
  color_names: string[] = [];
  material_names: string[] = [];

  constructor(private route: ActivatedRoute,
              private productDetailsService: ProductDetailsService) { }


  ngOnInit(): void {
    this.getProductDetails();
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
        if(this.product.image_ids){
          this.image_paths = this.productDetailsService.getProductImageUrls(this.product.image_ids);
        }
        // get product color names
        this.getColorNames();
    
        // get product material names
        this.getMaterialNames();
      }
    });
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
}
