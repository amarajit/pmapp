import { TestBed, inject } from '@angular/core/testing';

import { PtaskService } from './ptask.service';

describe('PtaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtaskService]
    });
  });

  it('should be created', inject([PtaskService], (service: PtaskService) => {
    expect(service).toBeTruthy();
  }));
});
