import { TestBed, inject } from '@angular/core/testing';

import { HttpMethodsService } from './http-methods.service';

describe('HttpMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMethodsService]
    });
  });

  it('should be created', inject([HttpMethodsService], (service: HttpMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
