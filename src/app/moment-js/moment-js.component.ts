import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'moment-js',
  templateUrl: './moment-js.component.html',
  styleUrls: ['./moment-js.component.scss']
})
export class MomentJsComponent implements OnInit {
  firstDate: number;
  days: number = 0;
  weeks: number = 0;
  months: number = 0;
  years: number = 0;

  result: string;

  constructor() { }

  ngOnInit() {
  }

  checking() {
    this.result = moment(this.firstDate).add({
      days: this.days,
      weeks: this.weeks,
      months: this.months,
      years: this.years
    }).format('YYYY-MM-DD');
  }

}
