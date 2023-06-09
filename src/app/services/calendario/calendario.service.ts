import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Schedule,
  ScheduleByUser,
  UpdateSchedule,
  Response,
} from '../../common/interfaces';
@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  constructor(private http: HttpClient) {}

  getAllSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.API_URL}/calendario`);
  }

  agenerarCalendario(): Observable<Schedule> {
    return this.http.get<Schedule>(`${environment.API_URL}/aaa`);
  }

  updateSchedule(schedule: UpdateSchedule): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/schedule`, schedule);
  }

  deleteSchedule(id: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/schedule/${id}`);
  }

  getScheduleByUser(): Observable<ScheduleByUser> {
    return this.http.get<ScheduleByUser>(`${environment.API_URL}/registros/today`);
  }
}
