export interface Cita {
  id?: number;
  placa: string;
  fechaHora: string; // ISO string de la API
}

export interface CitaCreateDto {
  placa: string;
  fechaHora: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}
