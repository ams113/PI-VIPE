import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'fichero'
})
export class FicheroPipe implements PipeTransform {

  transform(fichero: string, tipo: string = 'usuario'): any {
    let url = environment.URL_SERVICIOS + '/ficheros';

    if ( !fichero ) {
      return url + '/usuarios/default';
    }
    if ( fichero.indexOf('https') >= 0 ) {
      return fichero;
    }

    switch ( tipo ) {
      case 'fichero':
            url += '/ficheros/' + fichero;
            break;
      default:
            console.log('tipo de fichero no existe (usuarios, medicos, hospitales, videos, ficheros)');
            url += '/usuarios/default';
    }
    return url;
  }

}
