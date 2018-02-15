import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
isNavigation: boolean = false;

  switchNavigation() {
    this.isNavigation = !this.isNavigation;
  }

  hideNavigation(event) {
    this.isNavigation = event;
  }
}
