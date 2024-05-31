import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioBusquedaComponent } from './inicio-busqueda.component';

describe('InicioBusquedaComponent', () => {
  let component: InicioBusquedaComponent;
  let fixture: ComponentFixture<InicioBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioBusquedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
