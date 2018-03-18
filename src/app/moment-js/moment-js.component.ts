import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'moment-js',
  templateUrl: './moment-js.component.html',
  styleUrls: ['./moment-js.component.scss']
})
export class MomentJsComponent implements OnInit {
  firstDate: string = '';
  years: number = 0;
  months: number = 0;
  weeks: number = 0;
  days: number = 0;

  result: string;
  isCalculatedFirst: boolean = false;
  isDateSelected: boolean = false;

  startDate: string = '';
  endDate: string = '';
  isEnterStartDate: boolean = false;
  isEnterEndtDate: boolean = false;
  time: Time = null;

  constructor() { }

  ngOnInit() {
  }

  calculate(witchCalculate: string) {
    if (witchCalculate === 'firstCalculate') {

      this.result = moment(this.firstDate).add({
        days: this.days,
        weeks: this.weeks,
        months: this.months,
        years: this.years
      }).format('DD-MM-YYYY');
      this.isCalculatedFirst = true;
    }

    if (witchCalculate === 'secondCalculate') {
      this.isEnterStartDate = !this.startDate;
      this.isEnterEndtDate = !this.endDate;

      if (this.isEnterStartDate || this.isEnterEndtDate) {
        return;
      }

      this.isEnterStartDate = false;
      this.isEnterEndtDate = false;

      this.time = this.mapMomentObjToTime(moment(this.startDate), moment(this.endDate));
    }

  }

  cleanField(which: string) {
    if (which === 'firstCalculate') {
      this.years = 0;
      this.months = 0;
      this.weeks = 0;
      this.days = 0;
      this.result = '';
      this.isCalculatedFirst = false;
    }
  }
  removeError(whence: string) {
    if (whence === 'startDate') {
      this.isEnterStartDate = false;
    }
    if (whence === 'endDate') {
      this.isEnterEndtDate = false;
    }
  }

  mapMomentObjToTime(startDate: any, endDate: any) {
    const time = new Time();
    time.milliseconds = endDate.diff(startDate, 'milliseconds');
    time.seconds = endDate.diff(startDate, 'seconds');
    time.minutes = endDate.diff(startDate, 'minutes');
    time.hours = endDate.diff(startDate, 'hours');
    time.days = endDate.diff(startDate, 'days');
    time.weeks = endDate.diff(startDate, 'weeks');
    time.months = endDate.diff(startDate, 'months');
    time.years = endDate.diff(startDate, 'years');

    return time;
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
