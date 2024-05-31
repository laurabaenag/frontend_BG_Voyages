import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { LoginService } from '../../servicios/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private usuarioService: LoginService, private router: Router) {}

  loginUsuario(): void {
    this.usuarioService.login(this.email, this.password).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Credenciales válidas',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/inicio']); // Redirige a la página principal
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales inválidas',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        alert(this.errorMessage);
      }
    );
  }
}