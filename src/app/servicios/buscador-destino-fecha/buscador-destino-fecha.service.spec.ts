import { TestBed } from '@angular/core/testing';

import { BuscadorDestinoFechaService } from './buscador-destino-fecha.service';

describe('BuscadorDestinoFechaService', () => {
  let service: BuscadorDestinoFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorDestinoFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
