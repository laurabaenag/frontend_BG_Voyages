import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorFechaService } from '../../servicios/buscador-fecha/buscador-fecha.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscador-fecha',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './buscador-fecha.component.html',
  styleUrl: './buscador-fecha.component.css',
})
export class BuscadorFechaComponent implements OnInit {
  @Input() mostrarBuscadorF: boolean = false;
  fecha: string; // Fecha ingresada por el usuario
  fechaActual: string;

  constructor(
    private service: BuscadorFechaService,
    private actividadesService: ActividadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  }

  esFechaPasada(fechaActividad: string): boolean {
    return new Date(fechaActividad) < new Date(this.fechaActual);
  }

  buscarActividadesPorFecha(fecha: string): void {
    this.service.obtenerActividadesPorFecha(fecha).subscribe({
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
