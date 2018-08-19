import {inject, TestBed} from '@angular/core/testing';

import {MoviesTvDataService} from './movies-tv-data.service';

describe('MoviesTvDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesTvDataService]
    });
  });

  it('should be created', inject([MoviesTvDataService], (service: MoviesTvDataService) => {
    expect(service).toBeTruthy();
  }));
});
