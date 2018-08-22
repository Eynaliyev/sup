import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
	UserService,
	RequestService,
	ContactService
} from "../../services/services";
import { User, Contact } from "../../models/models";
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
	contacts: Contact[] = [];

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userSrvc: UserService,
		public authSrvc: AuthService,
		public contactSrvc: ContactService,
		private requestSrvc: RequestService,
		public alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {
		this.animateClass = { "zoom-in": true };
	}
	ionViewDidLoad() {
		//console.log(this.navParams.data);
		this.authSrvc
			.getUserData()
			.then(curUsr => {
				let id = this.navParams.get("user");
				this.currentUser = curUsr;
				console.log("currentUser in userProfile: ", this.currentUser);
				this.userSrvc.getUserById(id).subscribe(
					userInfo => {
						console.log("user, id from getUserByID()", userInfo, id);
						this.user = userInfo;
						if (this.requestSrvc.hasLiked(this.currentUser.id, userInfo.id)) {
							this.requested = true;
						} else if (this.contactSrvc.isFriend(userInfo.id)) {
							this.friend = true;
						}
					},
					err => console.log(err)
				);
			})
			.catch(err => console.log(err));
		console.log("ionViewDidLoad UserProfilePage");
		this.contactSrvc
			.getContacts(this.currentUser.id)
			.subscribe(contacts => (this.contacts = contacts));
	}
	changeImage(image) {
		console.log("changeImage called, but needs to be implements");
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
				title: "Confirm Request",
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
						text: "Send Request",
						handler: () => {
							console.log("Send Request clicked");
							this.requestSrvc.sendRequest(this.currentUser, id);
						}
					}
				]
			});
			alert.present();
			this.likeAlertPresented = true;
		} else {
			this.requestSrvc.sendRequest(this.currentUser, id);
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
							console.log("Block clicked");
							this.requestSrvc.block(id);
						}
					}
				]
			});
			alert.present();
			this.blockAlertPresented = true;
		} else {
			this.requestSrvc.block(id);
		}
	}
	unlike(id: string) {
		if (!this.unlikeAlertPresented) {
			// alert
			let message = "Are you sure?";
			if (this.contacts.forEach(contact => contact.id === this.user.id)) {
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
							console.log("Remove clicked");
							this.requestSrvc.cancelRequest(this.currentUser.id, id);
						}
					}
				]
			});
			alert.present();
			this.unlikeAlertPresented = true;
		} else {
			this.requestSrvc.cancelRequest(this.currentUser.id, id);
		}
	}
}
