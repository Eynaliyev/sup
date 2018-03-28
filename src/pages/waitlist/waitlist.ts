import { Component } from "@angular/core";
import {
	NavController,
	LoadingController,
	App,
	NavParams
} from "ionic-angular";
import { FilterPage, VIPPage, ChatroomPage } from "../pages";
import {
	ChatroomService,
	UserService,
	AuthService
} from "../../services/services";
import { Chatroom } from "../../models/models";
import { User } from "@firebase/auth-types";
@Component({
	selector: "page-waitlist",
	templateUrl: "waitlist.html"
})
export class WaitlistPage {
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public chatroomSrvc: ChatroomService,
		public navParams: NavParams,
		public userSrvc: UserService,
		public authSrv: AuthService,
		public app: App
	) {}
	ionViewDidLoad() {
		console.log("ionViewDidLoad MeetSomebodyPage");
	}
	ionViewDidEnter() {
		// get location property
		// TO DO
		let location = this.navParams.get("location");
		// get languages property
		let languages = this.navParams.get("languages");
		// join a chatroom
		this.authSrv.getUserData().then(user => {
			this.chatroomSrvc
				.joinChatroom(location, languages, user.gender)
				.then(chatroom => {
					this.goToChatroom(chatroom.id);
				});
		});
	}
	viewVIP() {
		this.navCtrl.push(VIPPage);
	}
	// view notifications
	viewFilter() {
		this.app.getRootNav().push(FilterPage);
	}
	goToChatroom(chatroomId: string) {
		this.navCtrl.push(ChatroomPage, { room: `${chatroomId}` });
	}
	back() {
		this.navCtrl.pop();
	}
}
