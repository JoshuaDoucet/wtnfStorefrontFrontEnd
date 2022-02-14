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
      this.getActiveOrderId();
    }

  private getActiveOrderId(): void {
    const userId = localStorage.getItem('userId');
    if(userId != null){
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
        this.getActiveOrderId();
        throw new Error("Cannot add product without an active order id.");
    }
  }

  removeProductFromCart(productId: string):Observable<CartItem>{
    if(this.activeOrderId){
        return this.http.delete<CartItem>(
          this.config.getApiHost() + `/orders/${this.activeOrderId}/products/${productId}`
      )
    }else{
      this.getActiveOrderId();
      throw new Error("Cannot delete product without an active order id.");
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
        this.getActiveOrderId();
        throw new Error("Cannot add product without an active order id.");
    }
  }
  //
}
