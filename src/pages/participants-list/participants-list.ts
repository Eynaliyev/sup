import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserProfilePage } from "../pages";
import { UserService } from "../../services/services";

@Component({
	selector: "page-participants-list",
	templateUrl: "participants-list.html",
	providers: [UserService]
})
export class ParticipantsListPage {
	participants = [];
	animateClass: any;
	users;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private authSrvc: AuthService
	) {
		this.animateClass = { "zoom-in": true };
	}
	/*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ionViewDidLoad() {
		//this.navParams.data - get users from navparams instead of loading from backend
		var env = this;
		this.users = this.navParams.get("participants");
		console.log("users: ", this.users);
		for (let i = 0; i < this.users.length; i++) {
			setTimeout(function() {
				env.participants.push(env.users[i]);
			}, 100 * i);
		}
	}
	goToUser(id) {
		this.navCtrl.push(UserProfilePage, { user: id });
	}
}
