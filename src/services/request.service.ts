import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestService {
  private requests:any;

  constructor() {
    this.requests = [];
  }

  getRequests(id: string):Observable<any[]> {
    // TO DO: get teh m from the backend, and get teh latest ones only
    return new Observable(observer => {
      observer.next(this.requests);
    });
  }
}
