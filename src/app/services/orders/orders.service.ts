import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order'
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService,
    private userProfileService: UserProfileService) { 
      const userId = localStorage.getItem('userId');
      if(userId != null){
        this.getActiveOrderId();
      }
    }

  // get all orders from external backend API
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.config.getApiHost() + '/orders');
  }

  // get an order that has specified id
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.config.getApiHost() + `/orders/${orderId}`);
  }
    
  // Create order
  createOrder(userId: string): Observable<Order> {
    return this.http.post<Order>(
      this.config.getApiHost() + `/orders`,
      { 
        user_id: userId,
        status: "active"
      }
    )
  }

  // 
  // Update order status for active order
  updateOrderStatus(status: string): Observable<Order> {
    const orderId = localStorage.getItem('activeOrdId')
    if(orderId){
      return this.http.put<Order>(
        this.config.getApiHost() + `/orders/${orderId}`,
        { 
          status: status
        }
      )
    }else{
      this.getActiveOrderId();
      throw new Error("Order status not updated. No active order ID found for user")
    }
  }

  // updates the activeOrderId property which 
  // is the active id of the order belonging to the logged in user
  getActiveOrderId(): void {
    const userId = localStorage.getItem('userId');
    if(userId != null){
      this.userProfileService.getUserOrders(userId).subscribe({
        error: (err) => {
          throw new Error("Cannot get user orders. " + err)
        },
        next: (orders) => {
          // orders for user retrieved, find the users active order
          let activeOrderFound = false;
          for(let i = 0; i < orders.length; i++){
            const orderId = orders[i].id
            if(orders[i].status == "active" && orderId){
              localStorage.setItem("activeOrdId", orderId)
              activeOrderFound = true;
            }
          }
          if(!activeOrderFound){
             // user has no active orders. Create one, update active order ID
             this.createOrder(userId).subscribe({
              error: (err) => {},
              next: (order) => {
                const orderId = order.id;
                if(orderId){
                  localStorage.setItem("activeOrdId", orderId)
                }else{
                  throw new Error("Order ID is undefined.")
                }
              }
            })
          }
        }
      });
    }else{
      throw new Error("User ID is null. Sign in to get order info")
    }
  }
}
