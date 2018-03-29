import { AuthService } from './../../services/auth.service';
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserService } from "../../services/services";
import { RequestService } from "../../services/services";
import { User } from "../../models/models";
import { Request } from "../../models/models";
import { AlertController } from "ionic-angular";

@Component({
	selector: "page-requests-list",
	templateUrl: "requests-list.html"
})
export class RequestsListPage {
	requests: Request[] = [];
	animateClass: any;
	currentUser: User;
	likeAlertPresented: boolean = false;
	unlikeAlertPresented: boolean = false;
	blockAlertPresented: boolean = false;
	unblockAlertPresented: boolean = false;
	blockedListVisible: boolean = false;

	constructor(
		public navCtrl: NavController,
		private requestsSrvc: RequestService,
		private userSrvc: UserService,
		public authSrvc: AuthService,
		public alertCtrl: AlertController
	) {
		console.log("RequestsListPage initialized");
		this.animateClass = { "zoom-in": true };
	}
	ionViewWillEnter() {}
	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.authSrvc.getUserData().then(user => {
				this.currentUser = user;
				this.requestsSrvc.getRequests(user.id).subscribe(requests => {
					let res = requests.sort((first, second) => {
						return second.date.getTime() - first.date.getTime();
					});
					for (let i = 0; i < res.length; i++) {
						setTimeout(function() {
							env.requests.push(res[i]);
						}, 100 * i);
					}
					// make sure the requests are seen
					for (let i = 0; i < this.requests.length; i++) {
						this.requestsSrvc.updateRequestSeen(
							this.requests[i].id,
							this.currentUser.id
						);
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
	toggleBlockListVisibility() {
		console.log("toggled BlockListVisibility: ", this.currentUser.blockedList);
		this.blockedListVisible != this.blockedListVisible;
	}
	like(id: string) {
		if (!this.likeAlertPresented) {
			// alert
			const alert = this.alertCtrl.create({
				title: "Confirm Like",
				message: "Do you want to add this person to contacts?",
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						handler: () => {
							console.log("Cancel clicked");
						}
					},
					{
						text: "Like",
						handler: () => {
							console.log("Buy clicked");
							this.userSrvc.like(id);
						}
					}
				]
			});
			alert.present();
			this.likeAlertPresented = true;
		} else {
			this.userSrvc.like(id);
		}
	}
	// should remove request from requests list, while keeping it as pending in the other person
	unlike(id: string) {
		if (!this.unlikeAlertPresented) {
			// alert
			// check if it's just a request or a friendship
			const alert = this.alertCtrl.create({
				title: "Confirm Like",
				message:
					"Do you want to refuse friend request? Don't worry we won't tell.",
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						handler: () => {
							console.log("Cancel clicked");
						}
					},
					{
						text: "Remove",
						handler: () => {
							console.log("Request cancelled");
							this.userSrvc.removeRequest(id);
						}
					}
				]
			});
			alert.present();
			this.unlikeAlertPresented = true;
		} else {
			this.userSrvc.removeRequest(id);
		}
	}
	unblock(id: string) {
		if (!this.unblockAlertPresented) {
			// alert
			// check if it's just a request or a friendship
			const alert = this.alertCtrl.create({
				title: "Confirm Unblock",
				message: "Do you want to unblock this user?",
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						handler: () => {
							console.log("Cancel clicked");
						}
					},
					{
						text: "Unblock",
						handler: () => {
							console.log("Unblock clicked");
							this.userSrvc.unblock(id);
						}
					}
				]
			});
			alert.present();
			this.unlikeAlertPresented = true;
		} else {
			this.userSrvc.removeRequest(id);
		}
	}
}