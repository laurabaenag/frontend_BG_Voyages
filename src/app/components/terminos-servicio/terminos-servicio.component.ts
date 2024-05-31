import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-terminos-servicio',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './terminos-servicio.component.html',
  styleUrl: './terminos-servicio.component.css'
})
export class TerminosServicioComponent {

}
