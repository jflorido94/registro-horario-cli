
import { ScheduleByUser, UpdRegistro } from './../../common/interfaces/schedule';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegistroHistorialUsuario, Registro, Response, Motivo } from '../../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  getRegistroByUser(): Observable<ScheduleByUser> {
    return this.http.get<ScheduleByUser>(`${environment.API_URL}/registros/today`);
  }

  getHistoryRegistroUser(): Observable<Registro[]> {
    return this.http.get<Registro[]>(
      `${environment.API_URL}/registros`,
    );
  }

  registerEntryRegistro(comentario: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/start`, {
      comentario: comentario,
    });
  }


  registerStop(motivo: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/break`, {
      motivo: motivo,
    });
  }

  registerBack(borrar: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/back`, {
      borrar: borrar,
    });
  }

  registerExitRegistro(comentario: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/end`, {
      comentario: comentario,
    });
  }


  registerStaExtra(motivo: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/extra`, {
      motivo: motivo,
    });
  }

  registerEndExtra(borrar: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/endExtra`, {
      borrar: borrar,
    });
  }

  getMotivos(): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(`${environment.API_URL}/motivo`,);
  }


  updateRegistro(registro: UpdRegistro ): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/registros/update`,registro)
  }

  deleteRegistro(registro: Registro ): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/registros/delete/`+registro.id)
  }


  download() {
    return this.http.get(`${environment.API_URL}/archivo`, {
      responseType: 'blob'
    });
  }

  downloadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = 'RegistroMensual.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
