export class CityWeather {
  id: number;
  name: string;
  description: string;
  icon: string;
  country: string;
  temp: number;
  position: CityPosition;
}

export class CityPosition {
  latitude: number;
  longitude: number;
}

