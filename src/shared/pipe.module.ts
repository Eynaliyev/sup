 import { NgModule } from '@angular/core';
 import { CalculateDistancePipe } from './calculate-distance.pipe';

 @NgModule({
     imports:        [],
     declarations:   [CalculateDistancePipe],
     exports:        [CalculateDistancePipe],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 }
