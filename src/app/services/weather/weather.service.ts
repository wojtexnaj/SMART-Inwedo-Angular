import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CityWeather, CityPosition } from '../../models/cityWeather';
import { keyForOpenWeatherMap } from '../../shared/open-weather-map-key';

@Injectable()
export class WeatherService {
  private key: string = keyForOpenWeatherMap;

  constructor(
    private http: Http
  ) { }

  getWeatherByCityName(cityname: string): Observable<Response> {
    return this.http.get('http://api.openweathermap.org/data/2.5/find?q=' + cityname + this.key + '&units=metric');
  }

  mapJsonToCityWeather(jsonData: any): CityWeather {

    const cityWeather = new CityWeather();

    cityWeather.id = jsonData.id;
    cityWeather.name = jsonData.name;
    cityWeather.description = jsonData.weather[0].description;
    cityWeather.icon = jsonData.weather[0].icon;
    cityWeather.country = jsonData.sys.country;
    cityWeather.temp =  Math.round(jsonData.main.temp);
    cityWeather.position = this.mapJsonToCityPosition(jsonData.coord);

    return cityWeather;
  }

  mapJsonToCityPosition(jsonData: any): CityPosition {

    const cityPosition = new CityPosition();
    cityPosition.latitude = Math.round(jsonData.lat);
    cityPosition.longitude = Math.round(jsonData.lon);

    return cityPosition;
  }

}
