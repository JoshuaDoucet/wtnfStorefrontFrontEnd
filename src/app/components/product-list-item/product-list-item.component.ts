import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
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
  apiHost: string | null = null;

  constructor(private router: Router,
              private congfigurationService: ConfigurationService) { }

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

}
