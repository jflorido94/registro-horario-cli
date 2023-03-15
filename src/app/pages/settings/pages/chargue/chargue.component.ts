import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Chargue } from '../../../../common/interfaces';
import { ChargueService } from '../../../../services/chargue/chargue.service';

@Component({
  selector: 'app-chargue',
  templateUrl: './chargue.component.html',
  styleUrls: ['./chargue.component.scss'],
})
export class ChargueComponent implements OnInit {
  motivoForm: FormGroup;
  listMotivoOk: boolean = false;
  showModalCreateChargueOk: boolean = false;
  showModalUpdateChargueOk: boolean = false;
  p = 1;
  listMotivo: Chargue[] = [];
  selectedMotivo: Chargue;
  @ViewChild('modalCreateChargue', { static: false })
  modalCreateChargue: ModalDirective;
  @ViewChild('modalUpdateChargue', { static: false })
  modalUpdateChargue: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private motivoService: ChargueService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormChargue();
    this.getAllChargue();
  }

  createFormChargue(): void {
    this.motivoForm = this.fb.group({
      filter: new FormControl(''),
    });
  }

  getAllChargue() {
    this.motivoService.getAllChargue().subscribe({
      next: (res) => {
        console.log(res);

        this.listMotivo = res;
        this.listMotivoOk = true;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los cargos');
      },
    });
  }

  showModalCreateChargue() {
    this.showModalCreateChargueOk = true;
    this.modalCreateChargue.show();
  }

  showModalUpdateChargue(motivo: Chargue) {
    this.selectedMotivo = motivo;
    this.showModalUpdateChargueOk = true;
    this.modalUpdateChargue.show();
  }

  deleteChargue(id: number) {
    this.motivoService.deleteChargue(id).subscribe({
      next: (_res) => {
        this.toastrService.success('Se elimino exitosamente el cargo');
        this.getAllChargue();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el cargo');
      },
    });
  }
}
