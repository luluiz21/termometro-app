import { Component, OnInit } from '@angular/core';
import { citiesArray, City } from 'src/app/core/models/city.model';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  cities: City[] = citiesArray;

  selectedCity: City = this.cities[0];

  temperature: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  feelsLike: number = 0;
  weatherDescription: string = '';
  lastUpdated: Date = new Date();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather();
  }

  onCityChange(event: any): void {
    const cityName = event.target.value;
    const city = this.cities.find(c => c.name === cityName);
    if (city) {
      this.selectedCity = city;
      this.fetchWeather();
    }
  }

  fetchWeather(): void {
    this.weatherService.getTemperature(this.selectedCity.latitude, this.selectedCity.longitude)
      .subscribe((data: any) => {
        this.temperature = data.current_weather.temperature;
        this.humidity = data.current_weather.humidity || 70; 
        this.windSpeed = data.current_weather.windSpeed || 10;
        this.feelsLike = data.current_weather.apparent_temperature || this.temperature;
        this.weatherDescription = this.mapWeatherCodeToDescription(data.current_weather.weathercode);
        this.lastUpdated = new Date();
      });
  }

  calculateThermometerHeight(temp: number): number {
    const minTemp = -10;
    const maxTemp = 60;
    const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temp));
    return ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
  }

  getThermometerColor(temp: number): string {
    const threshold = 15; 
  if (temp < threshold) {
    return 'rgb(0, 0, 255)'; 
  } 
  return 'rgb(255, 0, 0)'; 
  }

  mapWeatherCodeToDescription(code: number): string {
    switch (code) {
      case 0:
        return 'Clear Sky';
      case 1:
      case 2:
      case 3:
        return 'Partly Cloudy';
      case 45:
      case 48:
        return 'Fog';
      case 51:
      case 53:
      case 55:
        return 'Drizzle';
      case 56:
      case 57:
        return 'Freezing Drizzle';
      case 61:
      case 63:
      case 65:
        return 'Rain';
      case 66:
      case 67:
        return 'Freezing Rain';
      case 71:
      case 73:
      case 75: 
        return 'Snow fall';
      case 77:
        return 'Snow grains';
      case 80:
      case 81:
      case 82:
        return 'Rain Showers';
      case 85:
      case 86:
        return 'Snow showers'
      case 95:
        return 'Thunderstorm'
      case 96:
      case 99:
      default: 'Thunderstorm with slight and heavy hail'
        return 'Overcast';
    }
  }
}
