import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuarios() );
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  paginar( value: number ) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + value;
    // console.log(desde);
    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

    this.desde += value;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
      if (termino.length <= 0) {
        this.cargarUsuarios();
        return;
      }
      this.cargando = true;

      this._usuarioService.buscarUsuario(termino, this.desde)
        .subscribe( ( usuarios: Usuario[] ) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }
  borrarUsuario(usuario: Usuario) {
    // console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }
    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    }).then (borrar => {
        console.log( borrar );
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
                .subscribe(borrado => {
                  this.totalRegistros--;
                  if (this.desde >= this.totalRegistros) {
                    this.paginar(-5);
                  } else {
                    this.cargarUsuarios();
                  }
                });
        }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.updateUsuario(usuario)
        .subscribe();
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrar('usuarios', id);
  }

}
