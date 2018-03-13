import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'moment-js',
  templateUrl: './moment-js.component.html',
  styleUrls: ['./moment-js.component.scss']
})
export class MomentJsComponent implements OnInit {
  firstDate: string = '';
  days: number = 0;
  weeks: number = 0;
  months: number = 0;
  years: number = 0;
  result: string;
  isNotEnterFirsDate: boolean = false;

  startDate: string = '';
  endDate: string = '';
  isEnterStartDate: boolean = false;
  isEnterEndtDate: boolean = false;
  time: Time = null;

  constructor() { }

  ngOnInit() {
  }

  calculate() {
    if (this.firstDate === '') {
      this.isNotEnterFirsDate = true;
      return;
    }

    this.result = moment(this.firstDate).add({
      days: this.days,
      weeks: this.weeks,
      months: this.months,
      years: this.years
    }).format('YYYY-MM-DD');
    this.isNotEnterFirsDate = false;
  }
  removeError(whence: string) {
    if (whence === 'firstDate') {
      this.isNotEnterFirsDate = false;
    }
    if (whence === 'startDate') {
      this.isEnterStartDate = false;
    }
    if (whence === 'endDate') {
      this.isEnterEndtDate = false;
    }
  }

  calculate2() {
    if (this.startDate === '' && this.endDate === '') {
      this.isEnterStartDate = true;
      this.isEnterEndtDate = true;
      return;
    }
    if (this.startDate === '' && this.endDate !== '') {
      this.isEnterStartDate = true;
      this.isEnterEndtDate = false;
      return;
    }
    if (this.startDate !== '' && this.endDate === '') {
      this.isEnterStartDate = false;
      this.isEnterEndtDate = true;
      return;
    }
    this.isEnterStartDate = false;
    this.isEnterEndtDate = false;

    const startDate = moment(this.startDate);
    const endDate = moment(this.endDate);
    const time  = new Time();
    time.milliseconds = endDate.diff(startDate, 'milliseconds');
    time.seconds = endDate.diff(startDate, 'seconds');
    time.minutes = endDate.diff(startDate, 'minutes');
    time.hours = endDate.diff(startDate, 'hours');
    time.days = endDate.diff(startDate, 'days');
    time.weeks = endDate.diff(startDate, 'weeks');
    time.months = endDate.diff(startDate, 'months');
    time.years = endDate.diff(startDate, 'years');

    this.time = time;
  }

}

class Time {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
}
