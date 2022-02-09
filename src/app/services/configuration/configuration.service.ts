import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private apiHost: string = "http://52.0.169.67:3000";

  constructor() { }

  getApiHost(): string {
    return this.apiHost;
  }
}
