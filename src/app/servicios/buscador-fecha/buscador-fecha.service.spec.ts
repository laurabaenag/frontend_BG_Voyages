import { TestBed } from '@angular/core/testing';

import { BuscadorFechaService } from './buscador-fecha.service';

describe('BuscadorFechaService', () => {
  let service: BuscadorFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
