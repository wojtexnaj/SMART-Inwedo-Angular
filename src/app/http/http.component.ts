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
  cityNotFound: string = 'City not found';
  justYouSearchedForIt: string = 'Just you searched for it';
  previousSearch: string = '';

  constructor(
    private weatherservice: WeatherService
  ) { }

  ngOnInit() {
  }

  showWeather() {
    if (this.cityName === '') {
      return;
    }

    if(this.cityName == this.previousSearch){
      this.cityName = this.justYouSearchedForIt;
      return;
    }

    this.cleanCityNames();
    this.weatherservice.getWeatherByCityName(this.cityName)
    .subscribe((response: Response) => {
      if (response.json().count === 0) {
        this.cityName = this.cityNotFound;
        return;
      }
      response.json().list
      .map((jsonData: any) => {
        this.cityNames.push(this.weatherservice.mapJsonToCityWeather(jsonData));
      }
      );
    });
    this.savesSearchInPreviousSearch();
  }
  cleanCityNames() {
    this.cityNames = [];
  }

  cleanCityName() {
    if (this.cityName === this.cityNotFound)
      this.cityName = '';

    if (this.cityName === this.justYouSearchedForIt)
      this.cityName = '';
  }

  savesSearchInPreviousSearch() {
    this.previousSearch = this.cityName;
  }
}
