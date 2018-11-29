import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService, NotificationService } from "../../services/services";
import { User, Notification } from "../../models/models";
import * as moment from "moment";

@Component({
	selector: "page-notifications-list",
	templateUrl: "notifications-list.html"
})
export class NotificationsListPage {
	notifications: Notification[] = [];
	animateClass: any;
	currentUser: User;

	constructor(
		private navCtrl: NavController,
		private userSrvc: UserService,
		private notificationSrvc: NotificationService
	) {
		console.log("NotificationsListPage initialized");
		this.animateClass = { "zoom-in": true };
	} 
	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.userSrvc
				.getCurrentUser()
				.take(2)
				.subscribe(user => {
					this.currentUser = user;
					this.notificationSrvc
						.getNotifications(user.id)
						.subscribe(notifications => {
							let res = notifications.sort((first, second) => {
								return moment(second.createdAt).diff(moment(first.createdAt));
							});
							for (let i = 0; i < res.length; i++) {
								setTimeout(function() {
									env.notifications.push(res[i]);
									console.log(
										"notifications in notificationsList: ",
										env.notifications
									);
								}, 100 * i);
							}
						});
				});
		});
	}
	doInfinite(infiniteScroll) {
		//Begin async operation
		this.ngAfterViewInit()
			.then(() => {
				infiniteScroll.complete();
			})
			.catch(err => {
				console.log("Error:", err);
			});
	}
}
