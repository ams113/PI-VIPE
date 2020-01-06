import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { FicheroPipe } from './ficheros.pipe';



@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    FicheroPipe
  ],
  exports: [
    ImagenPipe,
    FicheroPipe
  ]
})
export class PipesModule { }
