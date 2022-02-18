// Cart checkout component
// Displays a checkout form to a user where they can place an order for the items in their cart

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from 'src/app/models/user';
import { LocationService } from 'src/app/services/location/location.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phone: number | undefined;
  email: string | undefined = '';
  addr1: string | undefined = '';
  addr2: string | undefined = '';
  city: string | undefined = '';
  state: string | undefined = '';
  zip: number | undefined;
  country: string | undefined = '';
  user: User = new User();

  constructor(private userProfileService: UserProfileService,
              private orderService: OrdersService,
              private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.autoFillCheckoutForm()
  }

  autoFillCheckoutForm(){
    const userId = localStorage.getItem('userId')
    if(userId){
      this.userProfileService.getUser(userId).subscribe({
        error: err => {
          alert("Cannot verify user credentials. Sign-In")
          let route = `/signin`;
          this.router.navigate([route]);
        },
        next: user => {
          this.firstName = user.first_name;
          this.lastName = user.last_name;
          this.phone = user.phone;
          this.email = user.email;
          // get location details
          const locationId = user.location_id;
          console.log(locationId)
          if(locationId){
            this.locationService.getLocation(locationId).subscribe({
              error: (err) => {console.log("Error retrieving user location")},
              next: (location) => {
                console.log(location);
                this.addr1 = location.street_addr_1;
                this.addr2 = location.street_addr_2;
                this.city = location.city;
                this.state = location.state;
                this.zip = location.zip;
                this.country = location.country;
              }
            });
          }else{
            console.log("Cannot prefill location details. Location ID undefined.")
          }
        }
      })
      }
  }

  placeOrder(): void {
    const userId = localStorage.getItem('userId')
    if(userId){
      // update order status from active to placed
      this.orderService.updateOrderStatus("placed").subscribe({
        error: (err) => {
          alert("Order status not updated. Sign out and then sign in.")
        },
        next: (order) => {
          // order is no longer active, create an active order
          this.orderService.createOrder(userId).subscribe({
            error: (err) => {},
            next: (order) => {
              if(order.id){
                localStorage.setItem("activeOrdId", order.id)
                // redirect to order confirmed page
                let route = `/cart/confirm`;
                this.router.navigate([route], {
                  state: { order: order}
                });
              }else{
                throw new Error("Order id is undefined");
              }
            }
          })
        }
      });  
    }else{
      alert("Please Sign-in")
      let route = `/authenticate`;
      this.router.navigate([route]);
    }
  }
}
