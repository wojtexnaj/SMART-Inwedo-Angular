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

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    // Services
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
