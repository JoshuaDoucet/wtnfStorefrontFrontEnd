// Navigation component
// Appears at the top of every route in the storefront application
// allows users to easily navigate between site routes

import { Component, Input, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userId: string | null = null;
  userFirstName : string | null = null;
  @Input() navigateOn: boolean = true;

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    // get user info from local storage
    this.userId = localStorage.getItem('userId');
    this.userFirstName = localStorage.getItem('userFirstName');
  }

  // sign user out. remove user info from local storage
  signOut(): void {
    this.userId = null;
    this.userFirstName = null;
    this.authenticateService.signOut();
  }
}
