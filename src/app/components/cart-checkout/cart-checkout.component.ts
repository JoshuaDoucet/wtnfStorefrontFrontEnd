import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  firstName: string = 'First Name';
  lastName: string = 'Last Name';
  phone: number = 8885550000;
  email: string = 'your@email.com';
  addr1: string = 'Line 1 Address';
  addr2: string = 'Line 2 Address';
  city: string = 'City';
  state: string = 'State';
  zip: number = -1;
  country: string = 'Country';

  constructor() { }

  ngOnInit(): void {
  }

  placeOrder(): void {
    console.log("Order placed")
  }
}
