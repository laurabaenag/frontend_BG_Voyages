import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDestinoFechaComponent } from './buscador-destino-fecha.component';

describe('BuscadorDestinoFechaComponent', () => {
  let component: BuscadorDestinoFechaComponent;
  let fixture: ComponentFixture<BuscadorDestinoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorDestinoFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorDestinoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
