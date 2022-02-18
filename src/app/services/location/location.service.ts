import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';4
import { Location } from 'src/app/models/location';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, 
    private config: ConfigurationService) { }

  getLocation(locationId: string): Observable<Location>{
    return this.http.get<Location>(this.config.getApiHost() + `/locations/${locationId}`);
  }

  createLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(
      this.config.getApiHost() + `/locations`,
      { 
        name: location.name,
        street_addr_1: location.street_addr_1,
        street_addr_2: location.street_addr_2,
        city: location.city,
        state: location.state,
        zip: location.zip,
        country: location.country,
        lat: location.lat,
        long: location.long,
        other_info: location.other_info
      }
    )
  }
}
