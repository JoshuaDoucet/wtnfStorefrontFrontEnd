import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authenticateService: AuthenticateService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authenticateService.authenticate(this.email, this.password)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('token', res);
        this.router.navigate(['/products']);
      });
  }

}
