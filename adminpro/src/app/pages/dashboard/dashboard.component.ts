import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent implements OnInit {

  @ViewChild('video')

  public video: ElementRef;

  videos: Video[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando = true;
  contenido = '';

  constructor( public _videoService: VideoService) { }

  ngOnInit() {
    this.cargarVideos();
  }

  cargarVideos() {
    this.cargando = true;
    this._videoService.cargarVideos( this.desde )
    .subscribe( (resp: any) => {
        this.videos = resp.videos;
        console.log(this.videos);
        this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  playVideo(nombre) {
    console.log(nombre);
    const url = 'https://localhost:3000/imagenes/descifrados/' + nombre;
    this.contenido = url;
    this.video.nativeElement.src = url;
    this.video.nativeElement.load();
    this.video.nativeElement.play();
  }

}