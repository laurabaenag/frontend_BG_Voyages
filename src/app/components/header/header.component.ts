import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Usuarios } from '../../models/usuarios.model';
import { LoginService } from '../../servicios/login/login.service';
import { ActividadesService } from '../../servicios/actividades/actividades.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nombre: string | null = null;
  isAdmin: boolean = false;

  constructor(private loginService: LoginService,
    private actividadesService: ActividadesService,
    private router: Router) {}

  ngOnInit(): void {
    this.actualizarInfoUser();
  }

  actualizarInfoUser(): void {
    this.nombre = this.loginService.getNombre();
    this.isAdmin = this.loginService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.logout();
    this.actualizarInfoUser();
  }

  obtenerAllActividades(): void {
    this.actividadesService.getActividades().subscribe({
      next: (actividades) => {
        this.actividadesService.setActividades(actividades);
        this.router.navigate(['/actividades']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Ocurrió un error al mostrar actividades:', error.message);
      }
    });
  }
}
