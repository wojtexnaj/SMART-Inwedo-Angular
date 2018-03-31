import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  isPhoneNumber: boolean = false;
  isMail: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showPhoneNumber() {
    this.isMail = false
    this.isPhoneNumber = true;
    setTimeout(() => this.isPhoneNumber = false, 10000)
  }

  showMail() {
    this.isPhoneNumber = false;
    this.isMail = true;
    setTimeout(() => this.isMail = false, 10000)
  }

}
