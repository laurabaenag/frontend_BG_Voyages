export interface Reservas {
  idReserva: number | null;
  usuarios: Usuarios | null;
  fechaReserva: string;
  personas: number;
  actividades: Actividades | null;
}

export type Usuarios = {
  id: number;
};

export type Actividades = {
  idActividad: number;
};