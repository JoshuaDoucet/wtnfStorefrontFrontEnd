import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  userId: string | null= "";
  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    // Fetch user if from authorization JWT 
    this.userId = this.userProfileService.getUserIdFromToken();
    // fetch user info from API
    this.getUser();
  }


 // fetch user info from API
  getUser(): void {
    if(this.userId != null){
      this.userProfileService.getUser(this.userId).subscribe({
        error: (err) => {console.log('ERROR' + err)},
        next: (user) => {
          this.user = user;
        }
      });
    }
  }

}
