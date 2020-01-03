import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  medicosRegistrados = 0;
  desde = 0;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos() {
    this._medicoService.cargarMedicos( this.desde )
    .subscribe( (resp: any) => {
        this.medicos = resp.medicos;
        this.medicosRegistrados = resp.total;
    });
  }

  buscarMedico( termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedico( termino, this.desde)
      .subscribe( ( medicos: Medico[] ) => {
        this.medicos = medicos;
      });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
      }).then (borrar => {
          if (borrar) {
            this._medicoService.borrarMedico(medico._id)
                  .subscribe(borrado => {
                    this.medicosRegistrados--;
                    if (this.desde >= this.medicosRegistrados) {
                      this.paginar(-5);
                    } else {
                      this.cargarMedicos();
                    }
            });
          }
      });
  }

  paginar( value: number ) {
    const desde = this.desde + value;

    if ( desde >= this.medicosRegistrados ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

    this.desde += value;
    this.cargarMedicos();
  }
}
