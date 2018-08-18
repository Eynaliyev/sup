import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService, NotificationService } from "../../services/services";
import { User, Notification } from "../../models/models";
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
		private authSrvc: AuthService,
		private notificationSrvc: NotificationService
	) {
		console.log("NotificationsListPage initialized");
		this.animateClass = { "zoom-in": true };
	} /*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ionViewWillEnter() {}
	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.authSrvc.getUserData().then(user => {
				this.currentUser = user;
				this.notificationSrvc
					.getNotifications(user.id)
					.subscribe(notifications => {
						let res = notifications.sort((first, second) => {
							return second.createdAt.getTime() - first.createdAt.getTime();
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
		this.ngAfterViewInit().then(() => {
			infiniteScroll.complete();
		});
	}
}
