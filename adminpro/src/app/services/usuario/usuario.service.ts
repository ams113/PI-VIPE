import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { SubirArchivoService } from '../uploadFile/subir-archivo.service';


import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor( public http: HttpClient, public router: Router, public _uploadFile: SubirArchivoService) {
    this.loadLs();
   }

  renuevaToken() {
    const url = environment.URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;

    return this.http.get( url )
            .map( (resp: any) => {
              this.token = resp.token;
              localStorage.setItem('token', this.token);
              console.log('Token renovado');
              return true;
            })
            .catch( err => {
              swal('No se pudo renover el token', err.msg, 'error');
              return  Observable.throw( err );
            });
  }

  isLogin(): boolean {
    return ( this.token.length > 5) ? true : false;
  }

  loadLs() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  saveLs( id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    // localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {
    const url = environment.URL_SERVICIOS + '/login/google';

    return  this.http.post( url, {token} )
            .map( (resp: any) => {
              this.saveLs( resp.id, resp.token, resp.usuario, resp.menu);
              console.log(resp);
              return true;
            });
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = environment.URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
          .map( (resp: any) => {
            this.saveLs( resp.id, resp.token, resp.usuario, resp.menu );
            return true;
          })
          .catch( err => {
            // console.log(err.error.msg);
            swal('Error en el login', err.error.msg, 'error');
            return  Observable.throw( err );
          });
  }

  crearUsuario( usuario: Usuario ) {

    const url = environment.URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
    .map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    })
    .catch( err => {
      // console.log( err.error.error.errors);
      swal(err.error.msg, err.error.error.errors.email.message, 'error');
      return  Observable.throw( err );
    });


  }

  updateUsuario(usuario: Usuario) {

    let url = environment.URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
              .map( (resp: any) => {
                // this.usuario = resp.usuario;
                if (usuario._id === this.usuario._id) {
                  this.saveLs( resp.usuario._id, this.token, resp.usuario, resp.menu);
                }
                swal("Usuario actualizado", resp.usuario.nombre, "success");
                return true;

              });
  }

  cambiarImagen( archivo: File, id: string ) {
    this._uploadFile.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal("Imagen Actualizada",  this.usuario.nombre, "success");
      this.saveLs(id, this.token, this.usuario, this.menu);
    })
    .catch( resp => {
      console.log( resp );
    });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuario( termino: string, desde: number = 0 ) {
    const url = environment.URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino + '?desde=' + desde;
    return  this.http.get( url )
              .map( (resp: any) => resp.usuarios );
}

borrarUsuario( id: string ) {
  const url = environment.URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
  return  this.http.delete( url )
              .map( resp => {
                swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                return true;
              });
}

}
