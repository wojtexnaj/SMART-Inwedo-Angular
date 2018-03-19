import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  HttpWeatherComponent,
  HttpMethodsComponent
 } from './http/index';
import { MomentJsComponent } from './moment-js/moment-js.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full' },
  { path: 'welcome-page', component: WelcomePageComponent, pathMatch: 'full' },
  { path: 'http-weather', component: HttpWeatherComponent, pathMatch: 'full' },
  { path: 'http-methods', component: HttpMethodsComponent, pathMatch: 'full' },
  { path: 'moment-js', component: MomentJsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
