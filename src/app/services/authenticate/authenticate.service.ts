import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService) { }

  authenticate(email: string, password: string): Observable<string> {
    return this.http.post<string>(
        this.config.getApiHost() + '/authenticate',
        { 
          email: email, 
          password: password
        }
      )
  }
  
}
