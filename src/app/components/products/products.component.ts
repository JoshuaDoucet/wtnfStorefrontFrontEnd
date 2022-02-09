import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'
import { ProductsService } from 'src/app/services/products/products.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  apiHost: string = "";

  constructor(private productService: ProductsService, 
              private config: ConfigurationService) { }

  ngOnInit(): void {
    this.apiHost = this.config.getApiHost();
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }


}
