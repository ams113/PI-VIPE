import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProgress') inputProgress: ElementRef;

  @Input('nombre-barra') leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges( newValue: number ){

    //let elemHTML = document.getElementsByName('progreso')[0];

    //console.log(this.inputProgress);

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (this.progreso <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    //elemHTML.value = this.progreso;
    this.inputProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor( valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);

    this.inputProgress.nativeElement.focus();
  }

}
