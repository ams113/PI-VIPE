import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required ),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required ),
      password2: new FormControl(null, Validators.required ),
      condiciones: new FormControl(false)
    }, { validators: this.matchField( 'password', 'password2' ) });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  matchField( field1: string, field2: string) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if ( pass1 === pass2) {
        return null;
      }

      return { matchField: true };
    };
  }

  registrarUsuario() {
    if ( this.forma.invalid )  {
      return;
    }
    if ( !this.forma.value.condiciones ) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    console.log('Forma válida', this.forma.valid);
    console.log(this.forma.value);

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe( resp => this.router.navigate(['/login']));
  }

}
