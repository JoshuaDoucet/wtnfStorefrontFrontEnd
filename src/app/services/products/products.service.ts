import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product'
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService) { }

  // get all products from external backend API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.config.getApiHost() + '/products');
  }
}
