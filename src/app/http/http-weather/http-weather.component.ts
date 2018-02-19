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
  previousSearch: string = '';

  loading: boolean = false;
  undesirableBehavior: boolean = false;

  infoToUser = {
    cityNotFound: 'City not found.',
    justYouSearchedForIt: 'You just searched for it.',
    enterTheWord: 'Enter the word.',
    theWordIsTooShort: 'The word is too short.',
  };

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {}

  showWeather() {
    this.loading = true;

    if (this.checkIsCityNameIsEmpty()) {
      this.loading = false;
      return;
    }

    if (!this.isAWord()) {
      this.cityName = this.infoToUser.enterTheWord;
      this.undesirableBehavior = true;
      this.loading = false;
      return;
    }

    if (this.checkIsCityNameIsTooShort()) {
      this.cityName = this.infoToUser.theWordIsTooShort;
      this.undesirableBehavior = true;
      this.loading = false;
      return;
    }

    if (this.checkIsCityNameIsPreviousSearch()) {
      this.cityName = this.infoToUser.justYouSearchedForIt;
      this.undesirableBehavior = true;
      this.loading = false;
      return;
    }

    this.cleanCityNames();
    this.weatherService.getWeatherByCityName(this.cityName)
    .subscribe((response: Response) => {
      if (response.json().count === 0) {
        this.cityName = this.infoToUser.cityNotFound;
        this.undesirableBehavior = true;
        this.loading = false;
        return;
      }
      response.json().list
      .map((jsonData: any) => {
        this.cityNames.push(this.weatherService.mapJsonToCityWeather(jsonData));
      });
      this.clearInput();
      this.loading = false;
    });
    this.savesSearchInPreviousSearch();
  }

  clearInput() {
    this.cityName = '';
    this.undesirableBehavior = false;
  }

  cleanCityNames() {
    this.cityNames = [];
  }

  cleanCityName() {
    // TODO: refactor code
    if (this.cityName === this.infoToUser.cityNotFound || this.cityName === this.infoToUser.justYouSearchedForIt || this.cityName === this.infoToUser.enterTheWord || this.cityName === this.infoToUser.theWordIsTooShort)
      this.clearInput();
  }

  savesSearchInPreviousSearch() {
    this.previousSearch = this.cityName;
  }

  checkIsCityNameIsEmpty(): boolean {
    return (this.cityName === '');
  }
  checkIsCityNameIsTooShort(): boolean {
    return (this.cityName.length < 3);
  }

  checkIsCityNameIsPreviousSearch(): boolean {
    return (this.cityName === this.previousSearch);
  }
  // TODO: improve the function
  isAWord(): boolean {
    const alphabel: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < this.cityName.length; i++) {
      if (alphabel.indexOf(this.cityName.toUpperCase().slice(i, i + 1)) === -1) {
        return false;
      }
    }
    return true;
  }
}
