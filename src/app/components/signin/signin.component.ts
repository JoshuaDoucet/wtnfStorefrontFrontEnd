import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string = "";
  password: string = "";
  errMsg: string = "";
  // used to disable buttons on navigator
  navigateOn: boolean = false;

  constructor(private authenticateService: AuthenticateService,
    private router: Router,
    private userProfileService: UserProfileService,
    private orderServoce: OrdersService) { }

  ngOnInit(): void {
    this.errMsg = "";
  }

  signIn(){
    this.authenticateService.authenticate(this.email, this.password)
      .subscribe(res => {
        // add JWT to local storage
        localStorage.setItem('token', res);
        const userId = this.userProfileService.getUserIdFromToken();
        if(userId == null){
          // if sign in unsucessful remain on page. update error message
          this.errMsg = "Invalid sign-in credentials."
          localStorage.removeItem('userId');
          localStorage.removeItem('userFirstName');
          localStorage.removeItem("activeOrdId");
        }else{
          //  if sign in successful
          // add user id to local storage
          localStorage.setItem('userId', userId);
          // add user to userFirstName in local storage
          this.userProfileService.getUser(userId).subscribe(user => {
            localStorage.setItem('userFirstName', user.first_name);
            // retrieve the active order id for the user and add it to local storage
            this.orderServoce.getActiveOrderId();
            // return user to products page
            this.router.navigate(['/products']);
          });
        }
      });
  }

}
