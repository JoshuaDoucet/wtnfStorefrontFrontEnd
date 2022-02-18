// User Profile Component
// Displays information about the logged in user

import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  location: Location = {name: ""};
  userId: string | null = "";
  constructor(private userProfileService: UserProfileService,
              private locationService: LocationService) { }

  ngOnInit(): void {
    // Fetch user if from authorization JWT 
    this.userId = this.userProfileService.getUserIdFromToken();
    // fetch user info from API
    this.getUserInfo();
  }

  // fetch user info from API
  getUserInfo(): void {
    if(this.userId != null){
      this.userProfileService.getUser(this.userId).subscribe({
        error: (err) => {
          console.log('ERROR - Could not retrive user.');
          this.userId = null;
        },
        next: (user) => {
          this.user = user;
          this.getLocation();
        }
      });
    }
  }

  getLocation(){
    console.log(this.user)
    if(this.user.location_id != null){
      this.locationService.getLocation(this.user.location_id).subscribe({
        error: (err) => {console.log("Cannot get location associated with user" + err)},
        next: (location) => {
          this.location = location;
        }
      });
    }
  }

}
