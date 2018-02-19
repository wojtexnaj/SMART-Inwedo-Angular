import { NavigationComponent } from '../app/navigation/navigation.component';
import { HeaderComponent } from './header/header.component';

// Http
import { HttpWeatherComponent } from './http/http-weather/http-weather.component';
import { HttpMethodsComponent } from './http/http-methods/http-methods.component';

// Shared
import { LoaderComponent } from './shared/loader/loader.component';

export const AppComponentList = [
  NavigationComponent,
  HeaderComponent,

  // Http
  HttpWeatherComponent,
  HttpMethodsComponent,

  // Shared
  LoaderComponent
];
