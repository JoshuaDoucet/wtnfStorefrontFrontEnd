import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from 'src/app/models/user';
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
  email: string = '';
  addr1: string = '';
  addr2: string = '';
  city: string = '';
  state: string = '';
  zip: number | undefined;
  country: string = '';
  user: User = new User();

  constructor(private userProfileService: UserProfileService,
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
        },
        next: user => {
          this.firstName = user.first_name;
          this.lastName = user.last_name;
          this.phone = user.phone;
          this.email = user.email;
        }
      })
      }
  }

  placeOrder(): void {
    let route = `/cart/confirm`;
    this.router.navigate([route], {
      state: { /* Pass info to confirm page here */}
    });
  }
}
