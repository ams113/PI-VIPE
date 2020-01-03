import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    /* this.subscription = this.backObs().subscribe( 
      numero => console.log('subs', numero),
      error => console.error('Error del obs', error),
      () => console.log('El observador termino!')
    ); */


   }

  ngOnInit() {
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

 /*  backObs(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
        const intervalo = setInterval( () => {
          contador++;

          const salida = {
            valor: contador
          };

          observer.next( salida );

          /* if (contador === 2 ) {
           // clearInterval( intervalo );
            observer.error('FALLO en 2');
          } */

         /*  if (contador === 3 ) {
            clearInterval( intervalo );
            observer.complete();
          } 
        }, 1000 );
    }).pipe (
      map( resp => resp.valor),
      filter( (valor: any, index) => {
        //console.log('Filter', valor, index);
       /*  if ( (valor % 2) === 1 ) {
          //impar
          return true;
        } else {
          //par
          return false;
        } 
      })
    );
  } */
}
