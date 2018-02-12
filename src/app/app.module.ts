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

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    // Services
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
