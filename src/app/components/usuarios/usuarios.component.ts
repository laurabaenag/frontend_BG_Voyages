import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../models/usuarios.model';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { LoginService } from '../../servicios/login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DetallesReservaService } from '../../servicios/detalles-reserva/detalles-reserva.service';
import { Reservas } from '../../models/detalles.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[];
  reservas: Reservas[];
  isAdmin: boolean = false;
  usuario: Usuarios;

  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private router: Router,
    private reservasService: DetallesReservaService
  ) {}
  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuariosService.obtenerTodosLosUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(
        (response) => {
          console.log('Usuario eliminado');
          Swal.fire({
            title: 'Éxito',
            text: 'El usuario se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          window.location.reload();
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          console.error('Error eliminando usuario', error);
        }
      );
    }
  }

  obtenerReservas(id: number): void {
    this.reservasService.getReservasByUserId(id).subscribe((reservas) => {
      this.reservas = reservas;
      this.router.navigate(['/detallesReserva']);
    });
  }
}
