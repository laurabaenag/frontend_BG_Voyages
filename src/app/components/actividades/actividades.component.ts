import { Component, OnInit } from '@angular/core';
import { Actividades } from '../../models/actividades.model';
import { Reservas } from '../../models/reservas.model';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { ReservasService } from '../../servicios/reservas/reservas.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BuscadorDestinoFechaComponent } from '../buscador-destino-fecha/buscador-destino-fecha.component';
import { BuscadorDestinoComponent } from '../buscador-destino/buscador-destino.component';
import { BuscadorFechaComponent } from '../buscador-fecha/buscador-fecha.component';
import { LoginService } from '../../servicios/login/login.service';
import { FormsModule } from '@angular/forms';
import { Destinos } from '../../models/destinos.model';
import { DestinosService } from '../../servicios/destinos/destinos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    BuscadorDestinoFechaComponent,
    BuscadorDestinoComponent,
    BuscadorFechaComponent,
    FormsModule,
  ],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent implements OnInit {
  formularioVisibleDestinoFecha: boolean = false;
  formularioVisibleDestino: boolean = false;
  formularioVisibleFecha: boolean = false;
  formularioVisible: boolean = false;
  actividades: Actividades[];
  destinos: Destinos[];
  isAdmin: boolean = false;
  actividadIdReserva: number = null;
  actividad: Actividades;
  isUpdating: boolean = false;

  constructor(
    private actividadesService: ActividadesService,
    private loginService: LoginService,
    private router: Router,
    private reservaService: ReservasService,
    private destinosService: DestinosService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    this.actividadesService.actividades$.subscribe((actividades) => {
      this.actividades = actividades;
      console.log(this.actividades);
    });

    this.destinosService.obtenerTodosLosDestinos().subscribe((destinos) => {
      this.destinos = destinos;
    });
  }

  formularioDestinoFecha() {
    this.formularioVisibleDestinoFecha = !this.formularioVisibleDestinoFecha;
  }

  formularioDestino() {
    this.formularioVisibleDestino = !this.formularioVisibleDestino;
  }

  formularioFecha() {
    this.formularioVisibleFecha = !this.formularioVisibleFecha;
  }

  mostrarFormularioReserva(actividad: Actividades) {
    this.router.navigate(['/reservas', actividad.idActividad]);
  }

  actualizarActividad(actividad: Actividades): void {
    this.actividad = { ...actividad };
    this.isUpdating = true;
    this.formularioVisible = true;
  }

  mostrarFormularioActividad() {
    this.actividad = {
      idActividad: null,
      destino: { id: null, nombre_destino: '', provincia: '', pais: '' },
      nombreActividad: '',
      descripcion: '',
      fechaActividad: null,
      horaActividad: '',
      urlImagenActividad: '',
    };
    this.isUpdating = false;
    this.formularioVisible = true;
  }

  guardarActividad() {
    console.log('ID del destino:', this.actividad.destino.id);
    if (this.isUpdating) {
      this.actividadesService
        .actualizarActividad(this.actividad.idActividad, this.actividad)
        .subscribe(
          (data) => {
            this.actividades = this.actividades.map((a) =>
              a.idActividad === data.idActividad ? data : a
            );
            Swal.fire({
              title: 'Éxito',
              text: 'La actividad se actualizó correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.cancelarFormulario();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        );
    } else {
      this.actividadesService.crearActividad(this.actividad).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            title: 'Éxito',
            text: 'La actividad se creó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.cancelarFormulario();
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  cancelarFormulario() {
    this.formularioVisible = false;
  }

  eliminarActividad(actividad: Actividades): void {
    if (confirm('¿Está seguro de que desea eliminar esta actividad?')) {
      this.actividadesService.deleteActividad(actividad.idActividad).subscribe(
        (response) => {
          console.log('Actividad eliminada', response);
          this.actividades = this.actividades.filter(
            (a) => a.idActividad !== actividad.idActividad
          );
          Swal.fire({
            title: 'Éxito',
            text: 'La actividad se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          console.error('Error eliminando actividad', error);
          console.log(actividad);
        }
      );
    }
  }
}
