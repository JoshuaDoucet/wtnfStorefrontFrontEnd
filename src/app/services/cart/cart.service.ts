import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable } from 'rxjs';
import { CartItem, CartItemSimple } from 'src/app/models/cartItem';
import { HttpClient } from '@angular/common/http';
import { UserProfileService } from '../user-profile/user-profile.service';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService,
    private orderService: OrdersService) {
      // get active order ID
      const userId = localStorage.getItem('userId')
      if(userId != null){
        this.orderService.getActiveOrderId();
      }
    }

  
  getCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.config.getApiHost() + '/cart');
  }

  addProductToCart(productId: string, quantity: number):Observable<CartItem>{
    const orderId = localStorage.getItem('activeOrdId')
    if(orderId){
        return this.http.post<CartItem>(
          this.config.getApiHost() + `/orders/${orderId}/products`,
          { 
            product_id: productId,
            product_quantity: quantity
          }
      )
      }else{
        this.orderService.getActiveOrderId();
        throw new Error("Cannot add product without an active order id.");
    }
  }

  removeProductFromCart(productId: string):Observable<CartItemSimple>{
    const orderId = localStorage.getItem('activeOrdId')
    console.log("Remove order id " + orderId)
    console.log("Prod id " + productId)
    if(orderId){
        return this.http.delete<CartItemSimple>(
          this.config.getApiHost() + `/orders/${orderId}/products/${productId}`
      )
    }else{
      this.orderService.getActiveOrderId();
      throw new Error("Cannot delete product without an active order id.");
    }
  }

  updateProductQuantityInCart(productId: string, quantity: number):Observable<CartItemSimple>{
    const orderId = localStorage.getItem('activeOrdId')
    if(orderId){
        return this.http.put<CartItemSimple>(
          this.config.getApiHost() + `/orders/${orderId}/products/${productId}`,
          { 
            product_quantity: quantity
          }
      )
      }else{
        this.orderService.getActiveOrderId();
        throw new Error("Cannot add product without an active order id.");
    }
  }
  //
}
