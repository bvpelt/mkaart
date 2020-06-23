import { TestBed } from '@angular/core/testing';

import { PdoklocatieService } from './pdoklocatie.service';

describe('PdoklocatieService', () => {
  let service: PdoklocatieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdoklocatieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
