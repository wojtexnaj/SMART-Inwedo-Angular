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
  wind: Wind;
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
  tempMax: number;
  tempMin: number;
}
export class Wind {
  deg: number;
  speed: number;
}

