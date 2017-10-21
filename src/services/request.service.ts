import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import {REQUESTS} from './mock-requests';
import {Request} from '../models/models';

@Injectable()
export class RequestService {
  private requests:Request[];

  constructor() {
    this.requests = REQUESTS;
  }

  getRequests(id: string):Observable<Request[]> {
    // TO DO: get teh m from the backend, and get teh latest ones only
    return new Observable(observer => {
      observer.next(this.requests);
    });
  }
}
