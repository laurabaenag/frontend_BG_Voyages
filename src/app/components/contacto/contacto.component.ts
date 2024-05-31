import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { Mensajes } from '../../models/mensajes.model';
import { MensajesContactoService } from '../../servicios/mensajes-contacto/mensajes-contacto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import  Swal  from "sweetalert2";
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {
  mensaje: Mensajes;

  constructor(
    private service: MensajesContactoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.mensaje = {
      idUsuario: { id: null, nombre: '', apellido: '', email: '' },
      telefono: '',
      mensaje: '',
      fechaEnvio: '',
    };
    this.mensaje.fechaEnvio = new Date().toISOString();
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(): void {
    const usuarioLogueado = this.loginService.getUsuarioLogueado(); // Obtengo los datos del usuario logueado
    if (usuarioLogueado) {
      this.mensaje.idUsuario.id = usuarioLogueado.id,
      this.mensaje.idUsuario.nombre = usuarioLogueado.nombre;
      this.mensaje.idUsuario.apellido = usuarioLogueado.apellido;
      this.mensaje.idUsuario.email = usuarioLogueado.email;
    }
  }

  onSubmit(): void {
    console.log(this.mensaje);
    this.mensaje.fechaEnvio = new Date().toISOString();
    this.service.saveMensaje(this.mensaje).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Mensaje enviado.',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        console.log(this.mensaje);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar.',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    );
  }
}
