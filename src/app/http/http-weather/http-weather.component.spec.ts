import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWeatherComponent } from './http-weather.component';

describe('httpWeatherComponent', () => {
  let component: HttpWeatherComponent;
  let fixture: ComponentFixture<HttpWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
