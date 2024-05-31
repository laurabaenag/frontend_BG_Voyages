import { Destinos } from '../models/destinos.model';

export interface Actividades {
  idActividad?: number;
  destino: Destinos;
  nombreActividad: string;
  descripcion: string;
  fechaActividad: Date;
  horaActividad: string;
  urlImagenActividad: string;
}
