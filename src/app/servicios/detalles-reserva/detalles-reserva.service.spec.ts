import { TestBed } from '@angular/core/testing';

import { DetallesReservaService } from './detalles-reserva.service';

describe('DetallesReservaService', () => {
  let service: DetallesReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
