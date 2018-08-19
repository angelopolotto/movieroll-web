import {inject, TestBed} from '@angular/core/testing';

import {FormErrorHandlerService} from './form-error-handler.service';

describe('FormErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormErrorHandlerService]
    });
  });

  it('should be created', inject([FormErrorHandlerService], (service: FormErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
