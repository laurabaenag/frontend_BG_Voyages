import { Injectable } from '@angular/core';
import { Destinos } from '../../models/destinos.model';
import { Actividades } from '../../models/actividades.model';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  private destinosURL = "http://localhost:8080/destinos/todos";
  private actividadesURL = "http://localhost:8080/actividades/encontrar";
  private baseUrl = 'http://localhost:8080/destinos';

  constructor(private http: HttpClient) { }

  obtenerTodosLosDestinos(): Observable<Destinos[]> {
    return this.http.get<Destinos[]>(this.destinosURL);
  }

  findActividadesByDestino(id: number): Observable<Actividades[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Actividades[]>(`${this.actividadesURL}/${id}`, { headers });
  }

  deleteDestino(id: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  actualizarDestino(id: number, destinoDetails: Destinos): Observable<Destinos> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Destinos>(`${this.baseUrl}/${id}`, destinoDetails, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  crearDestino(destino: Destinos): Observable<Destinos> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Destinos>(`${this.baseUrl}/guardar`, destino, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Respuesta del backend ${error.status}, ` + `body: ${error.error}`);
    }
    return throwError('Algo ha fallado');
  }
}
