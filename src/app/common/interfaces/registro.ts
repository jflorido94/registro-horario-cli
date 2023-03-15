// export interface Registro {
//   id?: number;
//   user_id?: number;
//   comentario?: string;
//   dia: string;
//   inicio?: string;
//   fin?: string;
//   pausa?: string;
//   extra?: string;
//   total?: string;
//   is_real?: boolean;
//   is_activa?: boolean;
//   }

export interface RegistroHistorialUsuario {
  currentDate: string;
  listHistoryStatusRegistro: RegistroEstado[];
}

export interface RegistroEstado {
  isActive: boolean;
  isLater: boolean;
  isDayOff: boolean;
  isAbsent: boolean;
  date: string;
}
