import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RegistroUsuario, Usuarios } from '../../models/usuarios.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignUpService } from '../../servicios/sign-up/sign-up.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  user: RegistroUsuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  };

  constructor(private service: SignUpService, private router: Router) {}

  onSubmit(): void {
    this.service.saveUser(this.user).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'El usuario se creó correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al crear usuario.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        console.error('Error al crear usuario.', error);
      }
    );
  }
}
