import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Notification } from "../models/models";

@Injectable()
export class NotificationService {
	private notifications: Notification[];

	constructor() {
		this.notifications = [];
	}

	getNotifications(id: string): Observable<Notification[]> {
		// TO DO: get teh m from the backend, and get teh latest ones only
		return new Observable(observer => {
			observer.next(this.notifications);
		});
	}
}
