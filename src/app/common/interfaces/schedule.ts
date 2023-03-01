import { ParseSourceSpan } from '@angular/compiler';

export interface Schedule {
  id?: number;
  name: string;
  notificationIsActive?: boolean;
  description: string;
  entryHour: string;
  exitHour: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  toleranceTime: number;
}

export interface UpdateSchedule {
  codSchedule?: number;
  name?: string;
  notificationIsActive?: boolean;
  description?: string;
  entryHour?: string;
  exitHour?: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  toleranceTime?: number;
}

export interface ScheduleByUser {
  // dayIsValid: boolean;
  // schedule: Schedule;
  jornada: Jornada;
  registro: Registro;
}

interface Jornada {
  nombre: string;
  descipcion: string;
  entrada: string;
  salida: string;
  total: string;
  tipo_jornada: TipoJornada;
}

interface Pausas {
  total: string;
  data?: Pausa
}

interface Extras {
  total: string;
  data?: Extra
}

interface Extra {
  total: string;
  inicio: string;
  fin: string;
  motivo: string;
  id?: number;
}

interface Pausa {
  total: string;
  inicio: string;
  fin: string;
  motivo: string;
  id?: number;
}

interface TipoJornada {
  nombre: string;
  libre: boolean;
  vacaciones: boolean;
  personal: boolean;
  remunerado: boolean;
}

export interface Registro {
  id?: number;
  dia: string;
  comentario?: string;
  entrada: string;
  salida: string;
  total: string;
  is_real?: boolean;
  pausas: Extras;
  extras: Pausas;
}

export interface UpdRegistro {
  dia: string;
  entrada: string;
  salida: string;
  pausas: string;
  extras: string;
}
