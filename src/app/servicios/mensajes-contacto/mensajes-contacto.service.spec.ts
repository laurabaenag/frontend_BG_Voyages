import { TestBed } from '@angular/core/testing';

import { MensajesContactoService } from './mensajes-contacto.service';

describe('MensajesContactoService', () => {
  let service: MensajesContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
