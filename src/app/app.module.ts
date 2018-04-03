import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App Component
import { AppComponent } from './app.component';

// Import all components from list
import { AppComponentList } from './app.component-list';

// Services
import { WeatherService } from './services/index';
import { HttpMethodsService } from './services/index';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Google Maps
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
     // Angular Google Maps
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAvMC6HfUm6xR3NzfA3S5_sizHvQ2QO2ic'
  }),
  ],
  providers: [
    // Services
    WeatherService,
    HttpMethodsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
