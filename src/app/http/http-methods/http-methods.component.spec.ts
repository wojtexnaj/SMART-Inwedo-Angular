import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpMethodsComponent } from './http-methods.component';

describe('HttpMethodsComponent', () => {
  let component: HttpMethodsComponent;
  let fixture: ComponentFixture<HttpMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
