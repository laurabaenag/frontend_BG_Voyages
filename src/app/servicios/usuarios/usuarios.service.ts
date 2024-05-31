import { Injectable } from '@angular/core';
import { Usuarios } from '../../models/usuarios.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuariosURL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  obtenerTodosLosUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.usuariosURL}/todos`);
  }

  obtenerUsuario(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.usuariosURL}/${id}`);
  }

  actualizarUsuario(
    id: number,
    usuarioDetails: Usuarios
  ): Observable<Usuarios> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<Usuarios>(`${this.usuariosURL}/${id}`, usuarioDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  eliminarUsuario(id: number): Observable<Usuarios[]> {
    return this.http.delete<Usuarios[]>(`${this.usuariosURL}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Respuesta del backend ${error.status}`);
    }
    return throwError('Algo ha fallado');
  }
}
