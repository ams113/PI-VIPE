import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      actRoute.params.subscribe( params => {
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
     }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
          .subscribe( (data: any) => {
            this.hospitales = data.hospitales;
          });

    this._modalUploadService.notificacion
        .subscribe( resp => {
          console.log( resp );
          this.medico.img = resp.medico.img;
        });
  }

  cargarMedico( id: string ) {
    this._medicoService.obtenerMedico(id)
          .subscribe( medico => {
            console.log(medico);
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital(this.medico.hospital);
          });
  }
  guardarMedico( f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico( this.medico)
        .subscribe( medico => {
          this.medico._id = medico._id;
         this.router.navigate(['/medico', medico._id]);

        });
  }

  cambioHospital( id: string ) {
      this._hospitalService.obtenerHospital( id )
            .subscribe( hospital => {
              this.hospital = hospital;
            });
  }

  cambiarFoto() {
    console.log(this.medico._id);
    this._modalUploadService.mostrar('medicos', this.medico._id);
  }

}
