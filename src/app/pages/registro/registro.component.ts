import { Motivo } from './../../common/interfaces/motivo';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Registro } from '../../common/interfaces';
import { Util } from '../../common/utils/util';
import { RegistroService } from '@services/registro/registro.service';
import { CalendarioService } from '@services/calendario/calendario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent
  implements AfterViewInit, OnDestroy, AfterContentChecked
{
  date: string = new Date().toString();
  countDownConfig: CountdownConfig = { leftTime: 0, demand: true };
  restSeconds: number;
  countInterval: NodeJS.Timer;
  totalSecondsOfSchedule: number;
  userExitHour: string;
  userEntryHour: string;
  userPauseTime: string;
  laboral: boolean = false;
  iniciado: boolean = false;
  pausado: boolean = false;
  extra: boolean = false;
  initAnimation: boolean = false;
  spinnerValue: number = 0;
  isActiveExitRegistro: boolean = false;
  isActiveEntryRegistro: boolean = false;
  motivos = [];
  constructor(
    private registroService: RegistroService,
    private scheduleService: CalendarioService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.getScheduleByUser();
    this.getMotivo();
  }

  ngOnDestroy(): void {
    this.initAnimation = false;
    this.isActiveEntryRegistro = false;
    this.spinnerValue = 101;
    clearInterval(this.countInterval);
  }

  getScheduleByUser() {
    this.scheduleService.getScheduleByUser().subscribe({
      next: (res) => {

        // console.log(res.registro);
        this.laboral =! res.jornada?.tipo_jornada.libre;
        this.iniciado = res.registro.entrada && !res.registro.salida;
        this.pausado = res.registro.pausas.data[0]?.inicio && !res.registro.pausas.data[0]?.fin ;

        // console.log('Pausado: '+this.pausado);

        this.extra = res.registro.extras.data[0]?.inicio && !res.registro.extras.data[0]?.fin ;

        this.userExitHour = res.jornada.salida;
        this.userEntryHour = res.registro.entrada;

        this.userPauseTime = res.registro.pausas.total ? res.registro.pausas.total : '00:00';
        this.totalSecondsOfSchedule = Util.totalSecondsOfSchedule(res.jornada.total );
        // this.totalSecondsOfSchedule = Util.totalSecondsOfSchedule(res.jornada.salida, res.jornada.entrada );
        this.getRegistroToday();
        // this.initCountDown(res.registro);
        // console.log(res);

      },
      error: (_err) => {

        this.toastrService.error(_err.mensaje ,'Sucedio un error al obtener la jornada de hoy');
      },
    });
  }

  getRegistroToday(): void {
    this.registroService.getRegistroByUser().subscribe({
      next: (res) => {
        this.initCountDown(res.registro);
        // console.log(res);

      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener la asistencia');
      },
    });
  }

  getMotivo(): void {
    this.registroService.getMotivos().subscribe({
      next: (res) => {
        res.forEach(item =>
          this.motivos[item.id] = item.nombre)
      }
    })
  }

  initCountDown(registroByUser: Registro) {
    if (registroByUser) {
      this.isActiveExitRegistro = registroByUser.entrada != null;
      this.initAnimation = true;
      this.countDownConfig = {
        // leftTime: Util.restSecondsOfDay(this.userExitHour),
        leftTime: this.totalSecondsOfSchedule - Util.passSecondsOfDay(this.userEntryHour) + Util.totalSecondsOfSchedule(this.userPauseTime),
        format: "HH:mm"
      };
    }

    if (registroByUser == null) {
      this.isActiveEntryRegistro = true;
    }
  }

  restartCountdown({ action }: CountdownEvent) {
    if (action == 'restart') {
      this.initSpinner();
    }
  }

  initSpinner() {
    this.countInterval = setInterval(() => {
      // TODO Mirar que tiempos y porcentaje pone en el spinner al iniciar jornada y al finalizar contando pausas

      let diferent = this.totalSecondsOfSchedule - Util.passSecondsOfDay(this.userEntryHour) + Util.totalSecondsOfSchedule(this.userPauseTime);

      this.spinnerValue = (1 - (diferent / this.totalSecondsOfSchedule)) * 100;
      if (this.spinnerValue >= 100) {
        this.ngOnDestroy();
      }
    }, 1000);
    this.isRegistroActive();
  }

  isRegistroActive() {
    if (!this.isActiveExitRegistro) {
      this.ngOnDestroy();
    }
  }


  // **************************

  registerStart(comentario: string) {
    this.registroService.registerEntryRegistro(comentario).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryRegistro = false;
      },
      error: (_err) => {

        this.toastrService.error(_err);
      },
    });
  }


  registerStop(motivo: string) {

    this.registroService.registerStop(motivo).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryRegistro = false;
      },
      error: (_err) => {
        this.toastrService.error(_err);
      },
    });
  }

  registerBack(borrar: string) {
    this.registroService.registerBack(borrar).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryRegistro = false;
      },
      error: (_err) => {
        this.toastrService.error(_err);
      },
    });
  }

  registerSalida(comentario: string) {
    this.registroService.registerExitRegistro(comentario).subscribe({
      next: (_res) => {
        this.ngOnDestroy();
        this.getScheduleByUser();
        this.isActiveExitRegistro = false;
      },
      error: (_err) => {
        this.toastrService.error(_err);
      },
    });
  }



  registerStaExtra(motivo: string) {
    this.registroService.registerStaExtra(motivo).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryRegistro = false;
      },
      error: (_err) => {
        this.toastrService.error(_err);
      },
    });
  }

  registerEndExtra(borrar: string) {
    this.registroService.registerEndExtra(borrar).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryRegistro = false;
      },
      error: (_err) => {
        this.toastrService.error(_err);
      },
    });
  }

}
