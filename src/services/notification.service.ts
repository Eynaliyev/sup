import {Injectable} from "@angular/core";
import {NOTIFICATIONS} from "./mock-notifications";
import {Notification} from '../models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  private notifications: Notification[];

  constructor() {
    this.notifications = NOTIFICATIONS;
  }

  getNotifications(id: string):Observable<Notification[]> {
    // TO DO: get teh m from the backend, and get teh latest ones only
    return new Observable(observer => {
      observer.next(this.notifications);
    });
  }
}
