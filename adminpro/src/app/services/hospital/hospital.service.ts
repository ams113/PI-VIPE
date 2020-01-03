import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales( desde: number = 0) {
    const url = environment.URL_SERVICIOS + '/hospital?desde=' + desde;
    console.log(url);
    return this.http.get( url );
  }

  obtenerHospital(id: string) {
    const url = environment.URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
              .map( (resp: any) => resp.hospital);
  }

  createHospital(nombre: string) {
    const url = environment.URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.hospital);
  }

  updateHospital(hospital: Hospital) {
    const url = environment.URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, { nombre: hospital.nombre } )
              .map( (resp: any) => {
                swal('Hospital Actualizado', hospital.nombre, 'success');
                return resp.hospital;
              });
  }

  borrarHospital(id: string) {
    const url = environment.URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => swal('Hospital Borrado', 'Eliminado correctamente', 'success'));
  }

  buscarHospital( termino: string, desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino + '?desde=' + desde;
    return  this.http.get( url )
              .map( (resp: any) => resp.hospitales );
}
}
