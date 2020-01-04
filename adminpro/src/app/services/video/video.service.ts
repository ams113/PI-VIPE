import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Video } from '../../models/video.model';
import { UsuarioService } from '../usuario/usuario.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class VideoService {


  totalvideoes: number = 0;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarvideos( desde: number = 0) {
    const url = environment.URL_SERVICIOS + '/video?desde=' + desde;
    console.log(url);
    return this.http.get( url );
  }

  obtenerVideo(id: string) {
    const url = environment.URL_SERVICIOS + '/video/' + id;
    return this.http.get( url )
              .map( (resp: any) => resp.video);
  }

  createVideo(nombre: string) {
    const url = environment.URL_SERVICIOS + '/video?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.video);
  }

  updateVideo(video: Video) {
    const url = environment.URL_SERVICIOS + '/video/' + video._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, { nombre: video.nombre } )
              .map( (resp: any) => {
                swal('Video Actualizado', video.nombre, 'success');
                return resp.video;
              });
  }

  borrarVideo(id: string) {
    const url = environment.URL_SERVICIOS + '/video/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => swal('Video Borrado', 'Eliminado correctamente', 'success'));
  }

  buscarVideo( termino: string, desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/busqueda/coleccion/videos/' + termino + '?desde=' + desde;
    return  this.http.get( url )
              .map( (resp: any) => resp.videos );
}

}
