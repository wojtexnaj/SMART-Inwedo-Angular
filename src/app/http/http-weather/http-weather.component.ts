import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/index';
import { CityWeather } from '../../models';
import { Response } from '@angular/http';

@Component({
  selector: 'http-weather',
  templateUrl: './http-weather.component.html',
  styleUrls: ['./http-weather.component.scss']
})
export class HttpWeatherComponent implements OnInit {
  cityName: string = '';
  cityNames: CityWeather[] = [];
  cityNotFound: string = 'City not found.';
  justYouSearchedForIt: string = 'You just searched for it.';
  previousSearch: string = '';

  loading: boolean = false;

  constructor(
    private weatherservice: WeatherService
  ) { }

  ngOnInit() {
  }

  showWeather() {
    this.loading = true;
    if (this.cityName === '') {
      this.loading = false;
      return;
    }

    if (this.cityName === this.previousSearch) {
      this.cityName = this.justYouSearchedForIt;
      this.loading = false;
      return;
    }

    this.cleanCityNames();
    this.weatherservice.getWeatherByCityName(this.cityName)
    .subscribe((response: Response) => {
      if (response.json().count === 0) {
        this.cityName = this.cityNotFound;
        this.loading = false;
        return;
      }
      response.json().list
      .map((jsonData: any) => {
        this.cityNames.push(this.weatherservice.mapJsonToCityWeather(jsonData));
      });
      this.loading = false;
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

  clearInput() {
    this.cityName = '';
  }
}
