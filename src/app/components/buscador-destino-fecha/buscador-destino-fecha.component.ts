import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorDestinoFechaService } from '../../servicios/buscador-destino-fecha/buscador-destino-fecha.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscador-destino-fecha',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './buscador-destino-fecha.component.html',
  styleUrl: './buscador-destino-fecha.component.css',
})
export class BuscadorDestinoFechaComponent implements OnInit {
  @Input() mostrarBuscadorDYF: boolean = false;
  nombreDestino: string = '';
  fecha: string; // Fecha ingresada por el usuario
  fechaActual: string;

  constructor(
    private service: BuscadorDestinoFechaService,
    private actividadesService: ActividadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  }


  buscarActividades(nombreDestino: string, fecha: string): void {
    this.service
      .obtenerActividadesPorFechaYDestino(nombreDestino, fecha)
      .subscribe({
        next: (actividades) => {
          this.actividadesService.setActividades(actividades);
          this.router.navigate(['/actividades']);
        },
        error: (error: HttpErrorResponse) => {
          console.error(
            'Ocurrió un error al buscar actividades:',
            error.message
          );
        },
      });
  }
}
