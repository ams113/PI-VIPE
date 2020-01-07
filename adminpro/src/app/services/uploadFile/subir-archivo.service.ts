import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string) {
    console.log(tipo);
    console.log(id);

    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      let url = '';

      if (archivo.type.indexOf('image') === 0) {
        formData.append('imagen', archivo, archivo.name);
         url = environment.URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      }
      if (archivo.type.indexOf('video') === 0) {
        formData.append('video', archivo, archivo.name);
        url = environment.URL_SERVICIOS + '/uploadFile/' + tipo + '/' + id;
      }

          xhr.onreadystatechange = function() {
            if ( xhr.readyState === 4 ) {
              if ( xhr.status === 200 ) {
                 // console.log('Imagen subida');
                resolve( JSON.parse(xhr.response) );
              } else {
                console.log( 'Fallo al subir el archivo' );
                reject( xhr.response);
              }
            }
          };

          xhr.open('PUT', url, true);
          xhr.send(formData);
    });
  }

}
