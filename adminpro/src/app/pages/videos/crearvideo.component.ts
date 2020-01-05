import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../models/video.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-crearvideo',
  templateUrl: './crearvideo.component.html',
  styles: []
})
export class CrearVideoComponent implements OnInit {


  video: Video = new Video('', '', '', '', '', '', '');


  constructor(
    public _videoService: VideoService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      actRoute.params.subscribe( params => {
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarVideo(id);
        }
      });

  }

  ngOnInit() {

    this._modalUploadService.notificacion
        .subscribe( resp => {
          console.log( resp );
          // this.medico.img = resp.medico.img;
        });
  }

  cargarVideo( id: string ) {
    this._videoService.obtenerVideo(id)
          .subscribe( video => {
            console.log(video);
            this.video = video;
          });
  }

  guardarVideo( f: NgForm) {
    if (f.invalid) {
      return;
    }
    console.log(this.video);

    this._videoService.createVideo2( this.video )
        .subscribe( video => {
           this.video._id = video._id;
           this.router.navigate(['/video', video._id]);

        });
  }

  cambiarFoto() {
    /* console.log(this.medico._id);
    this._modalUploadService.mostrar('medicos', this.medico._id); */
  }

}
