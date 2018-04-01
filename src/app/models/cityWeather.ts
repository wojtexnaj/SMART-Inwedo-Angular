export class CityWeather {
  id: number;
  clouds: Clouds;
  name: string;
  rain: string;
  snow: string;
  description: string;
  icon: string;
  country: string;
  position: CityPosition;
  main: Main;
}

export class Clouds {
  all: number;
}

export class CityPosition {
  latitude: number;
  longitude: number;
}

export class Main {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

