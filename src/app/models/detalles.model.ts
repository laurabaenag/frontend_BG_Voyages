export interface DetallesReserva {
  idDetalle: number;
  usuario: Usuarios;
  reservas: Reservas;
  actividades: Actividades;
}

export type Usuarios = {
  id: number;
};

export type Actividades = {
  idActividad: number;
};

export type Reservas = {
  idReserva: number;
};

