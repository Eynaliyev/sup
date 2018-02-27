import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import {REQUESTS} from './mock-requests';
import {Request} from '../models/models';

@Injectable()
export class RequestService {
  private requests: Request[];

  constructor() {
    this.requests = REQUESTS;
  }

  getRequests(id: string):Observable<Request[]> {
		// TO DO: get teh m from the backend, and get teh latest ones only
		// resolve it to current user's friend requests list
    return new Observable(observer => {
			console.log('data from mock-requests', REQUESTS, this.requests);
      observer.next(this.requests);
    });
	}
	updateRequestSeen(requestId: string, userId: string){
		//add the id to the seen in the backend
	}
}
