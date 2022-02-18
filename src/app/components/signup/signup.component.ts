import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';
import { LocationService } from 'src/app/services/location/location.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  navigateOn = false;

  firstName: string = '';
  lastName: string = '';
  phone: number | undefined;
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  addr1: string = '';
  addr2: string = '';
  city: string = '';
  state: string = '';
  zip: number | undefined;
  country: string = '';

  user: User = new User();

  errMsg: string = '';

  constructor(private userProfileService: UserProfileService,
              private locationService: LocationService,
              private orderService: OrdersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUp(): void{
    if(this.password != this.passwordConfirm){
      this.errMsg = "Passwords do not match."
    }else{
      // clear any error messages
      this.errMsg = '';
      // create user
      let userToCreate: User = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password,
      };
      this.userProfileService.createUser(userToCreate).subscribe({
        error: (err) => {console.log("Cannot create user. " + err)},
        next: (token) => {
          // add JWT to local storage
          localStorage.setItem('token', token);
          const userId = this.userProfileService.getUserIdFromToken();
          if(userId == null){
            // if sign up unsucessful remain on page. update error message
            this.errMsg = "Cannot create user. Try again."
            localStorage.removeItem('userId');
            localStorage.removeItem('userFirstName');
            localStorage.removeItem("activeOrdId");
          }else{
            //  if create user successful
            // add user id to local storage
            localStorage.setItem('userId', userId);
            // add user to userFirstName in local storage
            this.userProfileService.getUser(userId).subscribe(user => {
              localStorage.setItem('userFirstName', user.first_name);
              // retrieve the active order id for the user and add it to local storage
              this.orderService.getActiveOrderId();
              // create location for user
              let userLocation: Location = {
                name: "User: " + this.email + " location",
                street_addr_1: this.addr1,
                street_addr_2: this.addr2,
                city: this.city,
                state: this.state,
                zip: this.zip,
                country: this.country
              }
              this.locationService.createLocation(userLocation).subscribe({
                error: (err) => {console.log("Cannot create location for user. " + err)},
                next: (location) => {
                  // once location is created, created a user with the returned user id
                  userToCreate.location_id = location.id
                  userToCreate.id = userId;
                  // update user location id
                  this.userProfileService.updateUser(userToCreate).subscribe({
                    error: (err) => {console.log("Cannot update user. ")},
                    next: (user) => {
                        console.log("User created")
                        console.log(user);
                        // return user to products page
                        this.router.navigate(['/products']);
                    }
                  });

                }
              });



            });
          }
        }
      });




      
    }
  }
}
