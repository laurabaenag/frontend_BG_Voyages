import { Injectable } from '@angular/core';
import { Reservas } from '../../models/reservas.model';
import { DetallesReserva } from '../../models/detalles.model';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private reservasUrl = 'http://localhost:8080/reservas';
  private detallesUrl = 'http://localhost:8080/detallesReserva';

  constructor(private http: HttpClient) {}

  createReserva(reserva: Reservas, actividadId: number): Observable<Reservas> {
    reserva.actividades = { idActividad: actividadId } as any; // Agrega el ID de la actividad a la reserva
    return this.http.post<Reservas>(`${this.reservasUrl}/crear`, reserva);
  }

  getDetallesByUsuario(idUsuario: number): Observable<DetallesReserva[]> {
    return this.http.get<DetallesReserva[]>(
      `${this.detallesUrl}/usuario/${idUsuario}`
    );
  }

  deleteReserva(id: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.reservasUrl}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Backend ha devuleto este codigo ${error.status}, ` + ` ${error.error}`);
    }
    return throwError('No ha furulao');
  }
}
