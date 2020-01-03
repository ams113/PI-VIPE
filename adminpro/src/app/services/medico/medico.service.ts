import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class MedicoService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  buscarMedico( termino: string, desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino + '?desde=' + desde;
    return  this.http.get( url )
              .map( (resp: any) => resp.medicos );
  }

  cargarMedicos( desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);
  }

  borrarMedico( id: string ) {
    const url = environment.URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return  this.http.delete( url )
                .map( resp => swal('Médico borrado', 'El médico ha sido eliminado correctamente', 'success') );
  }

  guardarMedico( medico: Medico ) {

    let url = environment.URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizar
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
            .map( (resp: any) => {
              swal('Médico Actualizado', medico.nombre, 'success');
              return resp.medico;
            });
    } else {
      // crear
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
              .map( (resp: any) => {
                swal('Médico Creado', medico.nombre, 'success');
                return resp.medico;
              });
    }
  }

  obtenerMedico( id: string ) {
    const url = environment.URL_SERVICIOS + '/medico/' + id;
    console.log('url obtener medico', url);

    return  this.http.get( url )
    .map( (resp: any) => resp.medico);
  }

}

