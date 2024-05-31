import { Component, OnInit } from '@angular/core';
import { DetallesReserva, Reservas } from '../../models/detalles.model';
import { ReservasService } from '../../servicios/reservas/reservas.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BuscadorDestinoFechaComponent } from '../buscador-destino-fecha/buscador-destino-fecha.component';
import { BuscadorDestinoComponent } from '../buscador-destino/buscador-destino.component';
import { BuscadorFechaComponent } from '../buscador-fecha/buscador-fecha.component';
import { LoginService } from '../../servicios/login/login.service';
import { FormsModule } from '@angular/forms';
import { DetallesReservaService } from '../../servicios/detalles-reserva/detalles-reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-reserva',
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
  templateUrl: './detalles-reserva.component.html',
  styleUrl: './detalles-reserva.component.css',
})
export class DetallesReservaComponent implements OnInit {
  reservas: Reservas[] = [];
  isAdmin: boolean = false;

  constructor(
    private reservasService: ReservasService,
    private route: ActivatedRoute,
    private router: Router,
    private actividadesService: ActividadesService,
    private loginService: LoginService,
    private detallesReservaService: DetallesReservaService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    const userId = this.loginService.getUserId();

    if (!userId) {
      console.error('Usuario no logueado.');
      return;
    }

    this.detallesReservaService.getReservasByUserId(userId).subscribe(
      (reservas) => {
        this.reservas = reservas;
      },
      (error) => console.error('Error al obtener las reservas', error)
    );
  }

  verAllReservas(): void {
    this.detallesReservaService.obtenerAllReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  eliminarReserva(reserva: Reservas): void {
    if (confirm('¿Está seguro de que desea eliminar esta reserva?')) {
      this.reservasService.deleteReserva(reserva.idReserva).subscribe(
        (response) => {
          console.log('Reserva eliminada', response);
          this.reservas = this.reservas.filter(
            (d) => d.idReserva !== reserva.idReserva
          );
          Swal.fire({
            title: 'Éxito',
            text: 'La reserva se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Error eliminando reserva',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          console.error('Error eliminando reserva', error);
          console.log(reserva);
        }
      );
    }
  }
}
