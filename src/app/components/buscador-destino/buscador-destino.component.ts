import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorDestinoService } from '../../servicios/buscador-destino/buscador-destino.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscador-destino',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './buscador-destino.component.html',
  styleUrl: './buscador-destino.component.css',
})
export class BuscadorDestinoComponent {
  @Input() mostrarBuscadorD: boolean = false;
  nombreDestino: string = '';
  fecha: string = '';

  constructor(
    private service: BuscadorDestinoService,
    private actividadesService: ActividadesService,
    private router: Router
  ) {}

  buscarActividadesPorDestino(nombreDestino: string): void {
    this.service.obtenerActividadesPorDestino(nombreDestino).subscribe({
      next: (actividades) => {
        this.actividadesService.setActividades(actividades);
        this.router.navigate(['/actividades']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ocurrió un error al buscar actividades:', error.message);
      },
    });
  }
}
