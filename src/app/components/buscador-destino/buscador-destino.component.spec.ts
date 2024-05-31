import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDestinoComponent } from './buscador-destino.component';

describe('BuscadorDestinoComponent', () => {
  let component: BuscadorDestinoComponent;
  let fixture: ComponentFixture<BuscadorDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorDestinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
