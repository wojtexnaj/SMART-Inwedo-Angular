import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() isNavigation: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToSubpage(subpageName: string) {
    if (subpageName === 'http-weather') {
      this.router.navigate(['/http-weather']);
      this.isNavigation.emit(false);
    }

    if (subpageName === 'http-methods') {
      this.router.navigate(['/http-methods']);
      this.isNavigation.emit(false);
    }
  }

}
