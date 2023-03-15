import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistroEstado, Registro } from '@shared/interfaces';
import { Util } from '@shared/utils/util';
import { Constant } from '@shared/constants/Constant';
import { RegistroService } from '@services/registro/registro.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { log } from 'console';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements AfterViewInit {
  currentDate: string;
  readonly totalDaysOfWeek: number = Constant.TOTAL_DAY_OF_WEEK;
  historial: Registro[] = [];
  restDaysOfWeek: Date[] = [];
  dayOfWeek: number;
  totalDaysLater: number = 0;
  totalDaysAbsent: number = 0;
  totalDayOff: number = 0;

  constructor(
    private registroService: RegistroService,
    private toastrService: ToastrService
  ) {}

  ngAfterViewInit(): void {
    this.getHistorialRegistro();
  }

  getHistorialRegistro(): void {

    this.registroService.getHistoryRegistroUser().subscribe({
      next: (data) => {
        this.historial = data;
        // console.log(this.historial);
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener el historial');
      },
    });
  }

  download() {
    this.registroService.download().subscribe((response) => {
      this.registroService.downloadFile(response, 'application/octet-stream');
    });
  }

  getDataWeeks(currentDate: string): void {
    this.currentDate = currentDate;
    this.dayOfWeek = Util.currentDayOfWeek(currentDate);
  }

  validLastRegistro([lastRegistro]: RegistroEstado[]): void {
    if (
      lastRegistro.date.substring(0, 10) !== this.currentDate.substring(0, 10)
    ) {
      this.dayOfWeek--;
    }
  }

  getClassStatus({ isAbsent, isLater, isDayOff }: RegistroEstado): string {
    if (isAbsent) {
      return 'fa-solid fa-minus absent';
    }

    if (isDayOff) {
      return 'disabled';
    }

    if (isLater) {
      return 'fa-solid fa-exclamation warning';
    }

    return 'fa-solid fa-check success';
  }

  editarRegistro(registro: any, edit: Boolean) {

    if (edit) {
      var config: SweetAlertOptions = {
        title: `Editar registro del día </br> ${new Date(registro.dia).toLocaleDateString(undefined,{day: '2-digit', month: '2-digit', year: 'numeric'})}`,
        html:
        `<input type="hidden" value=${registro.dia} id="swal-input0">`
        + `<div class="form-group d-flex justify-content-between">`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-sign-in-alt"></i> Entrada:</label>`
        + `<input type="time" value=${registro.entrada} id="swal-input1" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-sign-out-alt"></i> Salida:</label>`
        + `<input type="time" value=${registro.salida} id="swal-input2" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `</div>`
        + `<div class="form-group d-flex justify-content-around">`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-coffee"></i> Pausas:</label>`
        + `<input type="time" value=${registro.pausas.total} id="swal-input3" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `<div class="form-group d-flex">`
        + `<label class="col"><i class="fas fa-plus-circle"></i> Extras:</label>`
        + `<input type="time" value=${registro.extras.total} id="swal-input4" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `</div>`
        ,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
      }
    } else {
      var config: SweetAlertOptions = {
        title: `Nuevo registro`,
        html:
        `<div class="form-group d-flex justify-content-center">`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-calendar-alt"></i></br> Fecha:</label>`
        + `<input type="date" value=${registro.dia} id="swal-input0" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div></div>`
        + `<div class="form-group d-flex justify-content-between">`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-sign-in-alt"></i> Entrada:</label>`
        + `<input type="time" value=${registro.entrada} id="swal-input1" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-sign-out-alt"></i> Salida:</label>`
        + `<input type="time" value=${registro.salida} id="swal-input2" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `</div>`
        + `<div class="form-group d-flex justify-content-around">`
        + `<div class="form-group d-flex ">`
        + `<label class="col"><i class="fas fa-coffee"></i> Pausas:</label>`
        + `<input type="time" value=${registro.pausas?.total || '00:00'} id="swal-input3" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `<div class="form-group d-flex">`
        + `<label class="col"><i class="fas fa-plus-circle"></i> Extras:</label>`
        + `<input type="time" value=${registro.extras?.total || '00:00'} id="swal-input4" class="form-control col ml-1" style="background-color: #ddd; font-size: 1em;">`
        + `</div>`
        + `</div>`
        ,
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        cancelButtonText: 'Cancelar',
      }
    }

    Swal.fire(config).then((result) => {
      if (result.value) {
        var $Newregistro = {
          'dia' : (document.getElementById('swal-input0') as HTMLInputElement).value,
          'entrada' : (document.getElementById('swal-input1') as HTMLInputElement).value,
          'salida' : (document.getElementById('swal-input2') as HTMLInputElement).value,
          'pausas' : (document.getElementById('swal-input3') as HTMLInputElement).value,
          'extras' : (document.getElementById('swal-input4') as HTMLInputElement).value,
        }

        console.log($Newregistro);
        // Acción para editar el registro con los nuevos valores de entrada y salida
        this.registroService.updateRegistro($Newregistro).subscribe({
          next: (res) => {
            this.toastrService.success(res.message);
            this.getHistorialRegistro();
          },
          error: (_err) => {
            this.toastrService.error(_err.message);
          },
        })

      }
      }
    );
  }

  eliminarRegistro(registro: any) {
    Swal.fire({
      title: `Eliminar el registro del dia </br> ${new Date(registro.dia).toLocaleDateString(undefined,{day: '2-digit', month: '2-digit', year: 'numeric'})}`,
      icon: 'warning',
      showCancelButton: true,
      text: '¿Esta seguro?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.registroService.deleteRegistro(registro).subscribe({
        next: (res) => {
          console.log(res);

          this.toastrService.success(res.message);
          this.getHistorialRegistro();
        },
        error: (_err) => {
          this.toastrService.error(_err.message);
        },
      })
    })
  }
}

