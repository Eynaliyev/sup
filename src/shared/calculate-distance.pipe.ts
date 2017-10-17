import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'calculateDistance'})
export class CalculateDistancePipe implements PipeTransform {

    transform(userCoords: string[], currentUserCoords:string[]) {
        return this.calculate(currentUserCoords[0], currentUserCoords[1], userCoords[0], userCoords[1]);
    }
    calculate(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;

      return Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    }
}

