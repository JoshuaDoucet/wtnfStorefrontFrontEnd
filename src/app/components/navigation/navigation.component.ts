import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userId: string | null = null;
  userFirstName : string | null = null;
  @Input() navigateOn: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // get user info from local storage
    this.userId = localStorage.getItem('userId');
    this.userFirstName = localStorage.getItem('userFirstName');
  }

  // sign user out. remove user info from local storage
  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    this.userId = null;
    localStorage.removeItem('userFirstName');
    this.userFirstName = null;
  }
}
