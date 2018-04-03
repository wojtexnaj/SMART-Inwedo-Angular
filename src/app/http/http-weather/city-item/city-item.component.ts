import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityWeather } from '../../../models';

@Component({
  selector: 'city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent implements OnInit {
  @Input() selectedCityWeather: CityWeather;
  @Output() isCityItem: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closeCityItem() {
    this.isCityItem.emit(false);
  }
  classForNgClass(item: number) {
    if (item <= 0) {
      return 'cold';
    }
    if (item > 0 && item <= 15) {
      return 'cool';
    }
    if (item > 15 || item < 25) {
      return 'warm';
    }
    if (item >= 25) {
      return 'hot';
    }
  }
}
