import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CityWeather, CityPosition, Main, Wind } from '../../models';
// import { keyForOpenWeatherMap } from '../../shared/open-weather-map-key';
import { Wind } from '../../models/cityWeather';

@Injectable()
export class WeatherService {
  // private key: string = keyForOpenWeatherMap;

  constructor(
    private http: Http
  ) { }

  getWeatherByCityName(cityname: string): Observable<Response> {
    return this.http.get('http://api.openweathermap.org/data/2.5/find?q=' + cityname + '&APPID=544acc97ad41e1c817efb0487429e01b' + '&units=metric');
  }

  mapJsonToCityWeather(jsonData: any): CityWeather {
    const cityWeather = new CityWeather();

    cityWeather.id = jsonData.id;
    cityWeather.clouds = jsonData.clouds;
    cityWeather.name = jsonData.name;
    cityWeather.rain = jsonData.rain;
    cityWeather.snow = jsonData.snow;
    cityWeather.description = jsonData.weather[0].description;
    cityWeather.icon = jsonData.weather[0].icon;
    cityWeather.country = jsonData.sys.country;
    cityWeather.main = this.mapJsonToMain(jsonData.main);
    cityWeather.position = this.mapJsonToCityPosition(jsonData.coord);
    cityWeather.wind = this.mapJsonToWind(jsonData.wind);

    return cityWeather;
  }

  mapJsonToCityPosition(jsonData: any): CityPosition {
    const cityPosition = new CityPosition();

    cityPosition.latitude = jsonData.lat;
    cityPosition.longitude = jsonData.lon;

    return cityPosition;
  }

  mapJsonToMain(jsonData: any): Main {
    const main = new Main();

    main.humidity = jsonData.humidity;
    main.pressure = jsonData.pressure;
    main.temp = Math.round(jsonData.temp);
    main.tempMax = jsonData.temp_max;
    main.tempMin = jsonData.temp_min;

    return main;
  }

  mapJsonToWind(jsonData: any): Wind {
    const wind = new Wind();

    wind.deg = jsonData.deg;
    wind.speed = jsonData.speed;

    return wind;
  }

}
