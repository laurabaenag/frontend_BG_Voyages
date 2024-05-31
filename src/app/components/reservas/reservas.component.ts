import { Component, OnInit } from '@angular/core';
import { Reservas } from '../../models/reservas.model';
import { Actividades } from '../../models/actividades.model';
import { DetallesReserva } from '../../models/detalles.model';
import { ReservasService } from '../../servicios/reservas/reservas.service';
import { DetallesReservaService } from '../../servicios/detalles-reserva/detalles-reserva.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
// import { ActividadesService } from '../servicios/reservas/reservas';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css',
})
export class ReservasComponent {
  actividades: Actividades;
  reserva: Reservas = {
    idReserva: null,
    usuarios: { id: null },
    fechaReserva: '',
    personas: 1,
    actividades: { idActividad: null },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private actividadesService: ActividadesService,
    private loginService: LoginService,
    private detallesReservaService: DetallesReservaService
  ) {}

  ngOnInit(): void {
    const actividadId = +this.route.snapshot.paramMap.get('idActividad');
    const userId = this.loginService.getUserId();

    if (!userId) {
      console.error('Usuario no logueado.');
      return;
    }

    this.reserva.usuarios.id = userId;
    this.reserva.fechaReserva = new Date().toISOString();

    if (actividadId) {
      this.actividadesService.getActividadById(actividadId).subscribe(
        (data) => (this.actividades = data),
        (error) => console.error('Error al obtener la actividad', error)
      );
    } else {
      console.error('ID de actividad no definido');
    }
  }

  confirmarReserva(): void {
    if (
      this.actividades &&
      this.reserva.usuarios.id &&
      this.reserva.personas > 0
    ) {
      console.log(this.reserva);
      this.reservasService
        .createReserva(this.reserva, this.actividades.idActividad)
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Reserva confirmada',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            console.log('Reserva confirmada', response);

            this.router.navigate(['/detallesReserva']);
          },
          (error) =>
            Swal.fire({
              title: 'Error',
              text: 'Error al crear la reserva',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
        );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Datos de la reserva incompletos o inválidos',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
}
