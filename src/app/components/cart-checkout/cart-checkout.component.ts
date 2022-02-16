import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phone: number | undefined;
  email: string = '';
  addr1: string = '';
  addr2: string = '';
  city: string = '';
  state: string = '';
  zip: number | undefined;
  country: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  placeOrder(): void {
    console.log("Order placed")
  }
}
