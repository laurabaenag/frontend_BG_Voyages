import { Injectable } from '@angular/core';
import { Actividades } from '../../models/actividades.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private baseUrl = 'http://localhost:8080/actividades';

  private actividadesSource = new BehaviorSubject<Actividades[]>([]);
  actividades$ = this.actividadesSource.asObservable();
  
  constructor(private http: HttpClient) { }

  setActividades(actividades: Actividades[]): void {
    this.actividadesSource.next(actividades);
  }

  getActividadById(id: number): Observable<Actividades> {
    return this.http.get<Actividades>(`${this.baseUrl}/${id}`);
  }

  getActividades(): Observable<Actividades[]> {
    return this.http.get<Actividades[]>(`${this.baseUrl}/todas`);
  }

  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  actualizarActividad(id: number, actividadDetails: Actividades): Observable<Actividades> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Actividades>(`${this.baseUrl}/${id}`, actividadDetails, { headers });
  }

  crearActividad(actividad: Actividades): Observable<Actividades> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Actividades>(`${this.baseUrl}/guardar`, actividad, { headers });
  }
}
