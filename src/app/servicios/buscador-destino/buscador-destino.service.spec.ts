import { TestBed } from '@angular/core/testing';

import { BuscadorDestinoService } from './buscador-destino.service';

describe('BuscadorDestinoService', () => {
  let service: BuscadorDestinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorDestinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
