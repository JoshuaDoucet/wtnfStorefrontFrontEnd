import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { HttpClient } from '@angular/common/http';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  activeOrderId: string | undefined;

  constructor(private http: HttpClient, 
    private config: ConfigurationService,
    private userProfileService: UserProfileService) {
      // get active order ID
      const userId = localStorage.getItem('userId');
      if(userId == null){
        throw new Error("Cannot initialize CartService with a null userId")
      }
      this.userProfileService.getUserOrders(userId).subscribe({
        error: (err) => {
          throw new Error("Cannot get user orders. " + err)
        },
        next: (orders) => {
          for(let i = 0; i < orders.length; i++){
            if(orders[i].status == "active"){
              this.activeOrderId = orders[i].id;
            }
          }
        }
      });
    }

  getCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.config.getApiHost() + '/cart');
  }

  addProductToCart(productId: string, quantity: number):Observable<CartItem>{
    if(this.activeOrderId){
        return this.http.post<CartItem>(
          this.config.getApiHost() + `/orders/${this.activeOrderId}/products`,
          { 
            product_id: productId,
            product_quantity: quantity
          }
      )
      }else{
      throw new Error("Cannot add product without an active order id.");
    }
  }

  updateProductQuantityInCart(productId: string, quantity: number):Observable<CartItem>{
    if(this.activeOrderId){
        return this.http.put<CartItem>(
          this.config.getApiHost() + `/orders/${this.activeOrderId}/products/${productId}`,
          { 
            product_quantity: quantity
          }
      )
      }else{
      throw new Error("Cannot add product without an active order id.");
    }
  }
  //
}
