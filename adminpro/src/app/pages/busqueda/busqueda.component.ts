import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  totalRegistros = 0;
  termino: string;

  constructor(public activateRoute: ActivatedRoute, public http: HttpClient) {
    activateRoute.params.subscribe( params => {
      this.termino = params.termino;
      this.busar( this.termino );
    });
   }

  ngOnInit() {
  }
  busar( termino: string ) {

    const url = environment.URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
    .subscribe( (resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;
    });
  }

}
