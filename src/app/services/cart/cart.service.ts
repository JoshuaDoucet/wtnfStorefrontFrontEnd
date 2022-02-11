import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService) { }

  getCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.config.getApiHost() + '/cart');
  }
}
