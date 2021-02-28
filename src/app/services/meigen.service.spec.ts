import { TestBed } from '@angular/core/testing';

import { MeigenService } from './meigen.service';

describe('MeigenService', () => {
  let service: MeigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
