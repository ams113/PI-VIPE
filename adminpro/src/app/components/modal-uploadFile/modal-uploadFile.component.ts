import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/uploadFile/subir-archivo.service';
import { ModalUploadFileService } from './modal-uploadFile.service';

@Component({
  selector: 'app-modal-uploadFile',
  templateUrl: './modal-uploadFile.component.html',
  styles: []
})
export class ModalUploadFileComponent implements OnInit {

  ficheroSubir: File;
  ficheroTemp: string;

  constructor(public _subirArchivo: SubirArchivoService, public _modalUploadFileService: ModalUploadFileService) {
    console.log('Modal Listo');
   }

  ngOnInit() {
  }

  cerrarModal() {  
    this.ficheroTemp = null;
    this.ficheroSubir = null;
    this._modalUploadFileService.ocultar();
  }

  subirFichero() {
    this._subirArchivo.subirFichero( this.ficheroSubir, this._modalUploadFileService.tipo, this._modalUploadFileService.id )
    .then( resp => {
      console.log(resp);
      this._modalUploadFileService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga...');
    });
  }

  seleccionFichero( archivo: File ) {    
    console.log(archivo)
    if ( !archivo ) {
      this.ficheroSubir = null;
      return;
    }
    if ( archivo.type.indexOf('video') < 0) {
      swal('Sólo videos', 'El archivo seleccionado no es un fichero de video', 'error');
      this.ficheroSubir = null;
      return;
    }

    this.ficheroSubir = archivo;

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.ficheroTemp = reader.result;

  }

}
