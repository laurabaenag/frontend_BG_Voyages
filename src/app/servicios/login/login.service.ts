import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../models/usuarios.model'; // Importa la interfaz

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/usuarios/inicioSesion';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.loginUrl}`, { email, password })
      .pipe(
        tap((response) => {
          console.log('Respuesta del Backend:', response); // Log para verificar la respuesta

          if (response.nombre) {
            localStorage.setItem('nombre', response.nombre);
            localStorage.setItem('idUsuario', response.idUsuario.toString());
            localStorage.setItem('isAdmin', response.isAdmin.toString()); // Convierto el valor booleano de response.isAdmin a cadena antes de almacenarlo
            localStorage.setItem('email', response.email);
            localStorage.setItem('apellido', response.apellido);

            console.log('Guardado en localStorage:', {
              nombre: localStorage.getItem('nombre'),
              idUsuario: localStorage.getItem('idUsuario'), 
              isAdmin: localStorage.getItem('isAdmin'),
              email: localStorage.getItem('email'),
              apellido: localStorage.getItem('apellido')
            });
          }
        })
      );
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('idUsuario');
    return userId ? +userId : null;
  }

  getUsuarioLogueado() {
    const id = localStorage.getItem('idUsuario');
    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const apellido = localStorage.getItem('apellido'); // Asegúrate de guardar también el apellido en el localStorage al iniciar sesión si es necesario

    if (id && nombre && email && apellido) {
      return {
        id: +id,
        nombre: nombre,
        apellido: apellido,
        email: email
      };
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('nombre');
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout(): void {
    localStorage.removeItem('nombre');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('email');
    localStorage.removeItem('apellido');
  }
}
