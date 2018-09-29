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
import { ContactsListPage } from "../contacts-list/contacts-list";
@Component({
	selector: "page-user-profile",
	templateUrl: "user-profile.html"
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
		public contactSrvc: ContactService,
		private requestSrvc: RequestService,
		public alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {
		this.animateClass = { "zoom-in": true };
	}
	ionViewDidLoad() {
		//console.log(this.navParams.data);
		this.userSrvc
			.getCurrentUser()
			.take(2)
			.subscribe(curUsr => {
				let id = this.navParams.get("user");
				this.currentUser = curUsr;
				this.contactSrvc.getContacts(id).subscribe(contacts => {
					this.contacts = contacts;
				});
				this.userSrvc.getUserById(id).subscribe(
					userInfo => {
						this.user = userInfo;
					},
					error => {
						throw new Error("Error: " + error); // throw an Error
					}
				);
				this.requestSrvc
					.hasLiked(this.currentUser.id, id)
					.then(val => (this.requested = val));
				this.contactSrvc
					.isFriend(this.currentUser.id, id)
					.then(val => (this.friend = val));
			});
	}
	changeImage(image) {
		console.log("changeImage called, but needs to be implements");
	}
	getHeight(tab) {
		var height = "";
		if (tab == "vote") height = "hidden";
		return height;
	}
	removeFriend() {
		this.contactSrvc
			.removeFriend(this.currentUser.id, this.user.id)
			.then(() => this.navCtrl.setRoot(ContactsListPage))
			.catch(err => console.error(err));
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
							this.requestSrvc
								.sendRequest(this.currentUser, this.user)
								.then(() => (this.requested = true))
								.catch(err => console.error(err));
						}
					}
				]
			});
			alert.present();
			this.likeAlertPresented = true;
		} else {
			this.requestSrvc.sendRequest(this.currentUser, this.user);
		}
	}
	unlike() {
		this.requestSrvc
			.cancelRequest(this.currentUser.id, this.user.id)
			.then(() => (this.requested = false))
			.catch(err => console.error(err));
	}
	block() {
		if (!this.blockAlertPresented) {
			const alert = this.alertCtrl.create({
				title: "Confirm Block",
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
							this.requestSrvc
								.block(this.currentUser, this.user)
								.then(() => {
									this.navCtrl.pop();
									// TO DO - kick the user out and tell him he has been - should be done on backend
								})
								.catch(err => console.error(err));
						}
					}
				]
			});
			alert.present();
			this.blockAlertPresented = true;
		} else {
			this.requestSrvc
				.block(this.currentUser, this.user)
				.then(() => {
					// TO DO - kick the user out and tell him he has been
				})
				.catch(err => console.error(err));
		}
	}
}
