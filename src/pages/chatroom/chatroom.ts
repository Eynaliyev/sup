import { UtilService } from "./../../shared/util.service";
import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import { UserService } from "../../services/services";
import { ChatroomService } from "../../services/services";
import { User } from "../../models/user.model";
import { Message } from "../../models/message.model";
import { Chatroom } from "../../models/chatroom.model";
import { UserProfilePage } from "../pages";
import { MeetSomebodyPage } from "../pages";
import { ParticipantsListPage } from "../pages";
import { AlertController } from "ionic-angular";
import * as moment from "moment";

@Component({
	selector: "page-chatroom",
	templateUrl: "chatroom.html"
})
export class ChatroomPage {
	@ViewChild(Content)
	content: Content;
	users: any[] = [];
	messages: any[] = [];
	chatroom: Chatroom;
	chatroomId: string = "";
	currentUser: User;
	bckgImgNum = Math.floor(Math.random() * 50);
	uniqueId = this.utilSrvc.guid();

	newMessage: Message = {
		content: "",
		createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
		id: this.uniqueId,
		roomId: "",
		sender: {
			id: "",
			firstName: "",
			lastName: "",
			imgUrl: ""
		},
		seen: []
	};
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userService: UserService,
		private chatroomService: ChatroomService,
		private alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {}
	/*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ionViewDidLoad() {
		this.chatroomId = this.navParams.get("room");
		this.newMessage.roomId = this.chatroomId;
		this.userService
			.getCurrentUser()
			.take(2)
			.switchMap(user => {
				this.currentUser = user;
				this.newMessage.sender.id = this.currentUser.id;
				this.newMessage.sender.firstName = this.currentUser.firstName;
				this.newMessage.sender.lastName = this.currentUser.lastName;
				this.newMessage.sender.imgUrl = this.currentUser.profilePhoto.imgUrl;
				this.newMessage.seen.push(this.currentUser.id);
				return this.chatroomService.getChatroomById(this.chatroomId);
			})
			.subscribe(chatroom => {
				this.chatroom = chatroom;
				this.users = this.chatroom.participants; // TO DO: get all participants' info
			});
		this.chatroomService.getMessages(this.chatroomId).subscribe(
			messages => {
				let newMessages = messages;
				console.log("newMessages: ", newMessages);
				// add position property
				let updatedMessages = this.utilSrvc.addMessagePosition(
					newMessages,
					this.currentUser.id
				);
				this.messages = updatedMessages;
			},
			err => {
				console.error(err);
			}
		);
	}
	ngAfterViewInit() {}
	exit() {
		this.chatroomService.leaveChatroom(this.chatroomId, this.currentUser.id);
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	goToUser(id) {
		this.navCtrl.push(UserProfilePage, { user: id });
	}
	updateSeen(messages: Message[], id: string): Message[] {
		let result = [];
		messages.forEach(message => {
			if (message.seen.indexOf(id) === -1) {
				this.chatroomService.updateSeen(this.chatroomId, message.id, id);
			}
			result.push(message);
		});
		return result;
	}
	getMessages() {
		let env = this;
		this.chatroomService.getMessages(this.chatroom.id, 10).subscribe(
			newMessages => {
				// add position property
				let updatedMessages = this.utilSrvc.addMessagePosition(
					newMessages,
					this.currentUser.id
				);
				// set the seen property
				let res = this.updateSeen(updatedMessages, this.currentUser.id);
				for (let i = 0; i < res.length; i++) {
					setTimeout(function() {
						env.messages.push(res[i]);
					}, 100 * i);
				}
			},
			err => {
				console.error(err);
			}
		);
	}
	openParticipantsList() {
		if (this.users) {
			this.navCtrl.push(ParticipantsListPage, { participants: this.users });
		} else {
			const alert = this.alertCtrl.create({
				title: "Wuf Wuf! Sorry Wuf",
				message: "Can't access the particiapnts list.",
				buttons: [
					{
						text: "Ok",
						role: "Ok",
						handler: () => {
							console.log("Ok clicked");
						}
					}
				]
			});
			alert.present();
		}
	}
	sendMessage() {
		this.chatroomService.sendMessage(this.chatroom.id, this.newMessage);
		this.newMessage.content = "";
	}
}
