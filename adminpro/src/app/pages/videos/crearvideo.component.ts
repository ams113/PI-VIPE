import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../models/video.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-crearvideo',
  templateUrl: './crearvideo.component.html',
  styles: []
})
export class CrearVideoComponent implements OnInit {


  video: Video = new Video('', '', '', '', '');


  constructor( public _videoService: VideoService, public _modalUploadService: ModalUploadService) {

     }

  ngOnInit() {

    this._modalUploadService.notificacion
        .subscribe( resp => {
          console.log( resp );
          // this.medico.img = resp.medico.img;
        });
  }


  guardarVideo( f: NgForm) {
    if (f.invalid) {
      return;
    }
    /* this._videoService.createVideo(  )
        .subscribe( medico => {
          // this.medico._id = medico._id;
          // this.router.navigate(['/medico', medico._id]);

        }); */
  }

  cambiarFoto() {
    /* console.log(this.medico._id);
    this._modalUploadService.mostrar('medicos', this.medico._id); */
  }

}
