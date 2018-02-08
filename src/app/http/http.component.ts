import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/index';
import { CityWeather } from '../models/cityWeather';
import { Response } from '@angular/http';

@Component({
  selector: 'httpComponent',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {
  cityName: string = '';
  cityNames: CityWeather[] = [];

  constructor(
    private weatherservice: WeatherService
  ) { }

  ngOnInit() {
  }

  showWeather() {
    if (this.cityName === '') {
      return;
    }
    this.cleanCityNames();
    this.weatherservice.getWeatherByCityName(this.cityName)
    .subscribe((response: Response) => {
      response.json().list
      .map((jsonData: any) => {
        this.cityNames.push(this.weatherservice.mapJsonToCityWeather(jsonData));
      }
      );
    });
  }
  cleanCityNames() {
    this.cityNames = [];
  }
}
