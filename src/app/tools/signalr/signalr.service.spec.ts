import { TestBed, inject } from '@angular/core/testing';

import { SignalrService } from './signalr.service';

describe('SignalrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrService]
    });
  });

  it('should ...', inject([SignalrService], (service: SignalrService) => {
    expect(service).toBeTruthy();
  }));
});
