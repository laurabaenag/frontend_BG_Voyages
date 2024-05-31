import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormasPrivacidadComponent } from './normas-privacidad.component';

describe('NormasPrivacidadComponent', () => {
  let component: NormasPrivacidadComponent;
  let fixture: ComponentFixture<NormasPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormasPrivacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormasPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
