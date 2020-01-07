import { Component, OnInit, ɵConsole } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video/video.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-videos',
  templateUrl: './video.component.html',
  styles: []
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando = false;


  constructor(public _videoService: VideoService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarVideos();
    this._modalUploadService.notificacion
      .subscribe( () => this.cargarVideos() );
  }

  cargarVideos() {
    this.cargando = true;
    this._videoService.cargarVideos( this.desde )
    .subscribe( (resp: any) => {
        this.videos = resp.videos;
        this.totalRegistros = resp.total;
      this.cargando = false;
    }); 
  }

  buscarVideo( termino: string ) {
    if (termino.length <= 0) {
      this.cargarVideos();
      return;
    }
    this.cargando = true;

    this._videoService.buscarVideo(termino)
      .subscribe( ( videos: Video[] ) => {
        this.videos = videos;
        this.cargando = false;
      });
} 

 borrarvideo(video: Video) {
  swal({
    title: '¿Estas seguro?',
    text: 'Esta a punto de borrar a ' + video.nombre,
    icon: 'warning',
    buttons: [true, true],
    dangerMode: true,
  }).then (borrar => {
      console.log( borrar );
      if (borrar) {
        this._videoService.borrarVideo(video._id)
              .subscribe(borrado => {
                this.totalRegistros--;
                if (this.desde >= this.totalRegistros) {
                  this.paginar(-5);
                }
                this.cargarVideos();
              });
      }
  });
} 
crearVideo () {
  swal({
    title: 'Crear Contenido',
    text: 'Ingrese el nombre del video',
    content: {
      element: "input",      
    },
    icon: 'info',
    buttons: [true, true],
    dangerMode: true,
  }).then ( (valor: string) => {
      console.log( valor );
      if (!valor || valor.length === 0) {
        return;
      }

      this._videoService.createVideo( valor )
        .subscribe( () => {
          const pag: number = Math.trunc(this.totalRegistros / 5);
          this.desde = pag * 5;
          this.cargarVideos();
        } );
  });
}

guardarVideo(videos: Video) {
  this._videoService.updateVideo( videos )
  .subscribe();
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
    this.cargarVideos();
  }

  actualizarVideo(videos: Video) {
    this._modalUploadService.mostrar('videos', videos._id);
  }
  
}
