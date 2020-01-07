import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/uploadFile/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subirArchivo: SubirArchivoService, public _modalUploadService: ModalUploadService) {
   }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {
    const tipos = ['image', 'video'];

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    console.log('File', archivo);

      if ( archivo.type.indexOf(tipos[0]) < 0 && archivo.type.indexOf(tipos[1]) < 0) {
        swal('Formato erroneo', 'El archivo seleccionado no es una imagen o un video', 'error');
        this.imagenSubir = null;
        return;
      }

    this.imagenSubir = archivo;

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    // tslint:disable-next-line:prefer-const
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    this._subirArchivo.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {
      console.log(resp);
      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga...');
    });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultar();
  }

}
