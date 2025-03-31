import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://api.open-meteo.com/v1/forecast';
  constructor(private http: HttpClient) {}

  getTemperature(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get(url);
  }
  
}
