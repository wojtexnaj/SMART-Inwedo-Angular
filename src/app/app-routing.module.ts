import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpWeatherComponent } from './http/http-weather/http-weather.component';
import { HttpMethodsComponent } from './http/http-methods/http-methods.component';

const routes: Routes = [
  { path: 'http-weather', component: HttpWeatherComponent, pathMatch: 'full' },
  { path: 'http-methods', component: HttpMethodsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
