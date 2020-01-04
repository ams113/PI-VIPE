import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  videos: Video[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando = true;

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

}