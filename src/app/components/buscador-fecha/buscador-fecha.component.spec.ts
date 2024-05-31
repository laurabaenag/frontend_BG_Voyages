import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFechaComponent } from './buscador-fecha.component';

describe('BuscadorFechaComponent', () => {
  let component: BuscadorFechaComponent;
  let fixture: ComponentFixture<BuscadorFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
