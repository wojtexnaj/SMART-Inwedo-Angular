import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App Component
import { AppComponent } from './app.component';

// Import all components from list
import { AppComponentList } from './app.component-list';

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
