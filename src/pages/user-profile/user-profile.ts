import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserService } from "../../services/services";
import { User } from "../../models/models";
import { UtilService } from "../../shared/util.service";
import { AlertController } from "ionic-angular";
import {
	flyInTopSlow1,
	flyInTopSlow2,
	flyInTopSlow3,
	flyInTopSlow4,
	flyInTopSlow5,
	heroState
} from "./user-profile.animations";
@Component({
	selector: "page-user-profile",
	templateUrl: "user-profile.html",
	animations: [
		flyInTopSlow1,
		flyInTopSlow2,
		flyInTopSlow3,
		flyInTopSlow4,
		flyInTopSlow5,
		heroState
	]
})
export class UserProfilePage {
	user: User;
	currentUser: User;
	tab: string = "vote";
	backGround: any;
	animateClass: any;
	friend: boolean = false;
	requested: boolean = false;
	likeAlertPresented: boolean = false;
	unlikeAlertPresented: boolean = false;
	blockAlertPresented: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userSrvc: UserService,
		private utilSrvc: UtilService,
		public alertCtrl: AlertController
	) {
		this.animateClass = { "zoom-in": true };
	}
	ionViewDidLoad() {
		let id = this.navParams.get("user");
		this.userSrvc
			.getCurrentUser()
			.switchMap(curUsr => {
				this.currentUser = curUsr;
				console.log("currentUser in userProfile: ", this.currentUser);
				return this.userSrvc.getUserById(id);
			})
			.subscribe(userInfo => {
				console.log("user, id from getUserByID()", userInfo, id);
				this.user = userInfo;
				if (this.userSrvc.hasLiked(this.currentUser.id, userInfo.id)) {
					this.requested = true;
				} else if (
					this.currentUser.contacts.forEach(
						contact => contact.id === this.user.id
					)
				) {
					this.friend = true;
				}
			});
		console.log("ionViewDidLoad UserProfilePage");
	}
	changeImage(image) {
		console.log("changeImage called, but needs to be implemented");
	}
	getHeight(tab) {
		var height = "";
		if (tab == "vote") height = "hidden";
		return height;
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
	block(id: string) {
		if (!this.blockAlertPresented) {
			const alert = this.alertCtrl.create({
				title: "Confirm Like",
				message:
					"Do you want to block this contact? You won't be placed in the same room with them again.",
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						handler: () => {
							console.log("Cancel clicked");
						}
					},
					{
						text: "Block",
						handler: () => {
							console.log("Request cancelled");
							this.userSrvc.block(id);
						}
					}
				]
			});
			alert.present();
			this.blockAlertPresented = true;
		} else {
			this.userSrvc.block(id);
		}
	}
	unlike(id: string) {
		if (!this.unlikeAlertPresented) {
			// alert
			let message = "Are you sure?";
			if (
				this.currentUser.contacts.forEach(
					contact => contact.id === this.user.id
				)
			) {
				message = "Do you want to cancel your friend request?";
			} else {
				message = "Do you want to remove user from your contacts list?";
			}
			// check if it's just a request or a friendship
			const alert = this.alertCtrl.create({
				title: "Confirm Like",
				message: message,
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
}
