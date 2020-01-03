import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class VerificaTokenGuard implements CanActivate {
  constructor ( public _usuarioService: UsuarioService, public router: Router) {
  }
  canActivate(): Promise<boolean> | boolean {
    const token = this._usuarioService.token;
    const payload = JSON.parse( atob(token.split('.')[1] ));
    const expirado = this.expirado( payload.exp );

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }
  verificaRenueva (fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( fechaExp * 1000);
      // tslint:disable-next-line:prefer-const
      let TiempoRenovacion = new Date();

      const periodoExp = TiempoRenovacion.getTime() + (4 * 60 * 60 * 1000);
      TiempoRenovacion.setTime( periodoExp);

       console.log( tokenExp );
       console.log( TiempoRenovacion );

      if ( tokenExp.getTime() > TiempoRenovacion.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
              this.router.navigate(['/login']);
              reject(false);
          });
      }

      resolve( true );
    });
  }
  expirado ( fechaExp: number) {
    // Fecha en milisegundos
    const miliTime = new Date().getDate();
    // fecha en segundos
    const ahoraSeg = miliTime / 1000;

    if (fechaExp < ahoraSeg) {
      return true;
    } else {
      return false;
    }
  }
}
