import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];


  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }


}
