import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ConfigurationService } from '../configuration/configuration.service';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService) { }

  // returns an extracted userId or null from a JWT
  getUserIdFromToken(): string | null{
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      // decode payload
      const payload = helper.decodeToken(token);
      if (payload != null && typeof payload === 'object') {
        if ('user' in payload) {
          var user = payload.user;
          if(user == null){
            userId = null;
          }
          else if ('id' in user) {
            userId = user.id;
          }
        }
      }
    }else{
      console.log("Auth token not found. Sign-In or Sign-Up");
    }
    return userId;
  }

  getUser(userId: string): Observable<User>{
    return this.http.get<User>(this.config.getApiHost() + `/users/${userId}`);
  }

  // update the logged in user
  updateUser(user: User): Observable<User>{
    const userId = localStorage.getItem('userId')
    return this.http.put<User>(
      this.config.getApiHost() + `/users/${userId}`,
      { 
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        location_id: user.location_id
      }
    )
  }


  createUser(user: User): Observable<string>{
    return this.http.post<string>(
      this.config.getApiHost() + `/users`,
      { 
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        location_id: user.location_id
      }
    )
  }

  getUserOrders(userId: string): Observable<Order[]>{
    return this.http.get<Order[]>(this.config.getApiHost() + `/users/${userId}/orders`);
  }
  
}
