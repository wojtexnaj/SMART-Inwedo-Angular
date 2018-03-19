import { NavigationComponent } from '../app/navigation/navigation.component';
import { HeaderComponent } from './header/header.component';

// Http
import {
  HttpWeatherComponent,
  HttpMethodsComponent
 } from './http/index';

// Shared
import { LoaderComponent } from './shared/loader/loader.component';

// Moment JS
import { MomentJsComponent } from './moment-js/moment-js.component';

// Welcome Page
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const AppComponentList = [
  NavigationComponent,
  HeaderComponent,

  // Http
  HttpWeatherComponent,
  HttpMethodsComponent,

  // Shared
  LoaderComponent,

  // Moment JS
  MomentJsComponent,

  // Welcome Page
  WelcomePageComponent
];
