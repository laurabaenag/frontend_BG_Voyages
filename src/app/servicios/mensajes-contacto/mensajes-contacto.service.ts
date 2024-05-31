import { Injectable } from '@angular/core';
import { Mensajes } from '../../models/mensajes.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesContactoService {
  private guardarUrl = 'http://localhost:8080/mensajes/guardar'; 
  private mostrarUrl = 'http://localhost:8080/mensajes/todos'; 

  constructor(private http: HttpClient) { }

  saveMensaje(mensaje: Mensajes): Observable<Mensajes> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Mensajes>(this.guardarUrl, mensaje, { headers });
  }

  obtenerAllMensajes(
  ): Observable<Mensajes[]> {
    return this.http.get<Mensajes[]>(this.mostrarUrl);
  }
}
