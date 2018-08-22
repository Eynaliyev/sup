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
	currentUser: User;
	backgroundImage;
	bckgImgNum = Math.floor(Math.random() * 50);
	uniqueId = this.utilSrvc.guid();

	newMessage: Message = {
		content: "",
		createdAt: new Date(),
		id: this.uniqueId,
		sender: {
			id: "",
			name: "",
			imageUrl: ""
		},
		roomId: "",
		seen: []
	};
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userService: UserService,
		private chatroomService: ChatroomService,
		private alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {
		let photoUrl = `../assets/images/background-${this.bckgImgNum}.jpg`;
		this.backgroundImage = `{'background-image': url('${photoUrl}')}`;
		// get chatroom id
		// on page loaded - load message history - paginated
		/*
				.subscribe(chatroom => {
				// get chatroom id from the nav params

				*/
		this.userService
			.getCurrentUser()
			.take(2)
			.switchMap(user => {
				this.chatroom.id = this.navParams.get("room");
				this.currentUser = user;
				this.newMessage.sender.id = this.currentUser.id;
				this.newMessage.sender.name = this.currentUser.firstName + " ";
				this.newMessage.sender.imageUrl = this.currentUser.profilePhoto.imgUrl;
				this.newMessage.seen.push(this.currentUser.id);
				console.log("currentUser: ", this.currentUser);
				return this.chatroomService.getChatroomById(this.chatroom.id);
			})
			.subscribe(chatroom => {
				console.log("chatroom loaded from firebase: ", this.chatroom);
				this.users = this.chatroom.participants; // TO DO: get all participants' info
				console.log("Chatroom page loaded with chatroom:", this.chatroom);
				this.newMessage.roomId = this.chatroom.id;
				return this.chatroomService.getMessages(this.chatroom.id).subscribe(
					messages => {
						let newMessages = messages;
						console.log("newMessages: ", newMessages);
						// add position property
						let updatedMessages = this.utilSrvc.addMessagePosition(
							newMessages,
							this.currentUser.id
						);
						console.log("updatedMessages: ", updatedMessages);
						// set the seen property
						//let res = this.updateSeen(updatedMessages, this.currentUser.id);
						// add time passed since the mssage was sent
						//res = this.utilSrvc.addMessageTimeSince(res);
						// To Do : add sender name based on participants ID, or nothing
						for (let i = 0; i < updatedMessages.length; i++) {
							setTimeout(function() {
								this.messages.push(updatedMessages[i]);
							}, 100 * i);
						}
						this.content.scrollToBottom(300); //300ms animation speed
						console.log("participants in the room: ", this.users);
					},
					err => {
						console.error(err);
					}
				);
			});
	}
	/*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/

	ngAfterViewInit() {}
	exit() {
		this.chatroomService.leaveChatroom(this.chatroom.id, this.currentUser.id);
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	goToUser(id) {
		this.navCtrl.push(UserProfilePage, { user: id });
	}
	updateSeen(messages: Message[], id: string): Message[] {
		let result = [];
		messages.forEach(message => {
			if (message.seen.indexOf(id) === -1) {
				this.chatroomService.updateSeen(this.chatroom.id, message.id, id);
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
				console.log("newMessages: ", newMessages);
				let updatedMessages = this.utilSrvc.addMessagePosition(
					newMessages,
					this.currentUser.id
				);
				console.log("updatedMessages: ", updatedMessages);
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
		this.newMessage.createdAt = new Date();
		this.chatroomService.sendMessage(this.chatroom.id, this.newMessage);
		this.newMessage.content = "";
	}
}
