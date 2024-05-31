import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Actividades } from '../../models/actividades.model';
import { ActividadesService } from "../../servicios/actividades/actividades.service";
import { BuscadorDestinoFechaComponent } from "../buscador-destino-fecha/buscador-destino-fecha.component";

@Component({
  selector: 'app-inicio-busqueda',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    FormsModule,
    BuscadorDestinoFechaComponent
  ],
  templateUrl: './inicio-busqueda.component.html',
  styleUrl: './inicio-busqueda.component.css'
})
export class InicioBusquedaComponent {
  formularioVisibleDestinoFecha: boolean = false;

  formularioDestinoFecha() {
    this.formularioVisibleDestinoFecha = !this.formularioVisibleDestinoFecha;
  }
}
