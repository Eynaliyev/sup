import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserService } from "../../services/services";
import { UserProfilePage } from "../pages";
import { RequestService, AlertService } from "../../services/services";
import { User, Request } from "../../models/models";
import { AlertController } from "ionic-angular";
import * as moment from "moment";

@Component({
	selector: "page-requests-list",
	templateUrl: "requests-list.html"
})
export class RequestsListPage {
	animateClass: any;
	currentUser: User;
	likeAlertPresented: boolean = false;
	unlikeAlertPresented: boolean = false;
	blockAlertPresented: boolean = false;
	unblockAlertPresented: boolean = false;
	blockedListVisible: boolean = false;
	sentListVisible: boolean = false;
	blockedList: Request[] = [];
	public requestsSent: Request[] = [];
	public requestsReceived: Request[] = [];

	constructor(
		public navCtrl: NavController,
		private requestsSrvc: RequestService,
		private userSrvc: UserService,
		private alertSrvc: AlertService,
		public alertCtrl: AlertController
	) {
		console.log("RequestsListPage initialized");
		this.animateClass = { "zoom-in": true };
	}
	ionViewWillEnter() {}
	ngAfterViewInit() {
		return new Promise(resolve => {
			this.userSrvc
				.getCurrentUser()
				.take(2)
				.subscribe(user => {
					this.currentUser = user;
					this.requestsSrvc.getReceivedRequests(this.currentUser.id).subscribe(
						reqs => {
							this.requestsReceived = reqs;
						},
						err => {
							console.error(err);
						}
					);
					this.requestsSrvc.getSentRequests(this.currentUser.id).subscribe(
						reqs => {
							this.requestsSent = reqs;
						},
						err => {
							console.error(err);
						}
					);
					/*// make sure the requests are seen
					for (let i = 0; i < this.requests.length; i++) {
						this.requestsSrvc.updateRequestSeen(
							this.requests[i].id,
							this.currentUser.id
						);
					}*/
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
	toggleBlockListVisibility() {
		console.log("toggled BlockListVisibility: ", this.blockedList);
		this.blockedListVisible != this.blockedListVisible;
	}
	toggleSentListVisibility() {
		console.log("toggled SentListVisibility: ", this.requestsSent);
		this.sentListVisible != this.sentListVisible;
	}
	goToUser(id) {
		this.navCtrl.push(UserProfilePage, { user: id });
	}
	accept(request: Request) {
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
					text: "Accept",
					handler: () => {
						this.alertSrvc.showAlert("Friend request accepted", "OK");
						this.requestsSrvc.acceptFriendRequest(this.currentUser, request);
					}
				}
			]
		});
		alert.present();
	}
	// should remove request from requests list, while keeping it as pending in the other person
	reject(request: Request) {
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
						this.alertSrvc.showAlert("Friend request removed", "OK");
						this.requestsSrvc.rejectRequest(
							this.currentUser.id,
							request.sender.id
						);
					}
				}
			]
		});
		alert.present();
	}
	removeRequest(request: Request) {
		this.requestsSrvc
			.cancelRequest(this.currentUser.id, request.recipient.id)
			.then(() => {
				this.alertSrvc.showAlert("Friend request removed", "OK");
			});
	}
	unblock(request: Request) {
		let id = request.sender.id;
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
							this.alertSrvc.showAlert("Unblocked", "OK");
							this.requestsSrvc.unblock(this.currentUser.id, id);
						}
					}
				]
			});
			alert.present();
			this.unlikeAlertPresented = true;
		} else {
			this.requestsSrvc.unblock(this.currentUser.id, id);
		}
	}
}
