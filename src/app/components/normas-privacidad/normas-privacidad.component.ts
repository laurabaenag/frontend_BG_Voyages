import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-normas-privacidad',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './normas-privacidad.component.html',
  styleUrl: './normas-privacidad.component.css'
})
export class NormasPrivacidadComponent {

}
