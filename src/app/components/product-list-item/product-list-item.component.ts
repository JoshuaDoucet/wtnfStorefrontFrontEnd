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
  @Input() product: Product = new Product();
  apiHost: string = "";

  constructor(private config: ConfigurationService,
              private router: Router) { }

  ngOnInit(): void {
    this.apiHost = this.config.getApiHost();
  }

  viewDetails() {
    let route = `/products/${this.product.id}`;
    this.router.navigate([route]);
  }

}
