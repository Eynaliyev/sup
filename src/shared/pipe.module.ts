import { NgModule } from '@angular/core';
import { CalculateDistancePipe } from './calculate-distance.pipe';
import {AgePipe} from './age.pipe';
 @NgModule({
     imports:        [],
     declarations:   [CalculateDistancePipe, AgePipe],
     exports:        [CalculateDistancePipe, AgePipe],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 }
