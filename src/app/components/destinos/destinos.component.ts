import { Component, OnInit } from '@angular/core';
import { Destinos } from '../../models/destinos.model';
import { DestinosService } from '../../servicios/destinos/destinos.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Actividades } from '../../models/actividades.model';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinos',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css',
})
export class DestinosComponent implements OnInit {
  destinos: Destinos[];
  isAdmin: boolean = false;
  actividades: Actividades[];
  destino: Destinos;
  formularioVisible: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private destinosService: DestinosService,
    private actividadesService: ActividadesService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    this.obtenerDestinos();
  }

  obtenerDestinos(): void {
    this.destinosService.obtenerTodosLosDestinos().subscribe((destinos) => {
      this.destinos = destinos;
    });
  }

  obtenerActividades(destino: Destinos): void {
    this.destinosService.findActividadesByDestino(destino.id).subscribe({
      next: (actividades) => {
        this.actividadesService.setActividades(actividades);
        this.router.navigate(['/actividades']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ocurrió un error al buscar actividades:', error.message);
      },
    });
  }

  eliminarDestino(destino: Destinos): void {
    if (confirm('¿Está seguro de que desea eliminar este destino?')) {
      this.destinosService.deleteDestino(destino.id).subscribe(
        (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'El destino se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.destinos = this.destinos.filter((d) => d.id !== destino.id);
        },
        (error) => {
          console.error('Error eliminando destino', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  actualizarDestino(destino: Destinos): void {
    this.destino = { ...destino };
    this.isUpdating = true;
    this.formularioVisible = true;
  }

  mostrarFormularioDestino() {
    this.destino = {
      id: null,
      nombre_destino: '',
      provincia: '',
      pais: '',
    };
    this.isUpdating = false;
    this.formularioVisible = true;
  }

  guardarDestino() {
    if (this.isUpdating) {
      this.destinosService
        .actualizarDestino(this.destino.id, this.destino)
        .subscribe(
          (response) => {
            console.log(response);
            this.destinos = this.destinos.map((d) =>
              d.id === response.id ? response : d
            );
            Swal.fire({
              title: 'Éxito',
              text: 'El destino se actualizó correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.cancelarFormulario();
          },
          (error) => {
            console.error('Error al actualizar destino.', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        );
    } else {
      console.log('Guardando:', this.destino);
      this.destinosService.crearDestino(this.destino).subscribe(
        (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'El destino se creó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error al crear destino.', error);
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
}
