import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1 = 65;
  progreso2 = 35;

  constructor() { }

  ngOnInit() {
  }
/* 
  actulizar( event: number) {
    console.log('Actualizar Evento: ', event);
    this.progreso1 = event;
  } */
}
