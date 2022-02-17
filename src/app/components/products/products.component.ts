// Products Components/ Displays a list of all available products for sale

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // list of all products for sale
  products: Product[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    // Get all products from service
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }


}
