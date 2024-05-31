import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { LoginService } from '../../servicios/login/login.service';
import { Usuarios } from '../../models/usuarios.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
})
export class PerfilUsuarioComponent implements OnInit {
  isAdmin: boolean = false;
  usuarios: Usuarios[];
  usuario: Usuarios;
  usuarioForm: Usuarios;
  nombre: string | null = null;
  formularioVisible: boolean = false;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    const userId = this.loginService.getUserId();

    if (!userId) {
      console.error('Usuario no logueado.');
      return;
    }

    this.usuarioService.obtenerUsuario(userId).subscribe(
      (usuarios) => {
        this.usuario = usuarios;
        this.usuarioForm = usuarios;
      },
      (error) => console.error('Error al obtener el usuario', error)
    );
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(
        (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'El usuario se eliminó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          console.log('Usuario eliminado');
          this.loginService.logout();
          this.actualizarInfoUser();
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

  actualizarInfoUser(): void {
    this.nombre = this.loginService.getNombre();
    this.isAdmin = this.loginService.isAdmin();
    this.obtenerDatosUsuario();
  }

  actualizarUsuario(): void {
    this.usuarioService
      .actualizarUsuario(this.usuario.id, this.usuarioForm)
      .subscribe((response) => {
        console.log(response);
        // this.usuarios = this.usuarios.map((u) =>
        //   u.id === response.id ? response : u
        // );
        Swal.fire({
          title: 'Éxito',
          text: 'El usuario se actualizó correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.cancelarFormulario();
      });
  }

  cancelarFormulario() {
    this.formularioVisible = false;
  }

  mostrarFormularioUsuario() {
    console.log(this.usuarioForm);
    //  this.usuarioForm = {
    //    id: null,
    //    nombre: '',
    //    apellido: '',
    //    email: '',
    //    password: '',
    //    esAdmin: false,
    //  };
    this.formularioVisible = true;
  }

  obtenerDatosUsuario(): void {
    const usuarioLogueado = this.loginService.getUsuarioLogueado(); // Obtengo los datos del usuario logueado
    if (usuarioLogueado) {
      this.usuario.nombre = usuarioLogueado.nombre;
      this.usuario.apellido = usuarioLogueado.apellido;
      this.usuario.email = usuarioLogueado.email;
    }
  }
}
