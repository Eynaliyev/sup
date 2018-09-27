import { UtilService } from "./../../shared/util.service";
import {
	Component,
	ViewChild,
	ViewEncapsulation,
	ElementRef
} from "@angular/core";
import { NavController, NavParams, Content, List } from "ionic-angular";
import { UserService, ChatroomService } from "../../services/services";
import { Chatroom, User, Message } from "../../models/models";
import { UserProfilePage, MeetSomebodyPage, ParticipantsListPage } from "../pages";
import { AlertController } from "ionic-angular";
import * as moment from "moment";
import "rxjs/add/operator/mergeMap";

@Component({
	selector: "page-chatroom",
	templateUrl: "chatroom.html",
	encapsulation: ViewEncapsulation.None
})
export class ChatroomPage {
	private mutationObserver: MutationObserver;
	@ViewChild(Content)
	contentArea: Content;
	@ViewChild(List, { read: ElementRef })
	chatList: ElementRef;
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
		this.contentArea.scrollToBottom();
		this.mutationObserver = new MutationObserver(mutations => {
			this.contentArea.scrollToBottom();
		});

		this.mutationObserver.observe(this.chatList.nativeElement, {
			childList: true
		});
		this.chatroomId = this.navParams.get("room");
		let privateConversation = this.navParams.get("privateConversation");
		this.newMessage.roomId = this.chatroomId;
		this.userService
			.getCurrentUser()
			.take(2)
			.flatMap(user => {
				this.currentUser = user;
				this.newMessage.sender.id = this.currentUser.id;
				this.newMessage.sender.firstName = this.currentUser.firstName;
				this.newMessage.sender.lastName = this.currentUser.lastName;
				this.newMessage.sender.imgUrl = this.currentUser.profilePhoto.imgUrl;
				this.newMessage.seen.push(this.currentUser.id);
				if (privateConversation) {
					return this.chatroomService.getConversationById(this.chatroomId);
				} else {
					return this.chatroomService.getChatroomById(this.chatroomId);
				}
			})
			.subscribe(chatroom => {
				this.chatroom = chatroom;
				if (!privateConversation) {
					localStorage.setItem("currentChatroomId", JSON.stringify(chatroom.id));
				}
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
				setTimeout(this.scrollToBottom, 300); // <- when the new item is pushed, scroll to the bottom to show it
			},
			err => {
				console.error(err);
			}
		);
	}
	exit() {
		localStorage.removeItem("currentChatroomId");
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
	scrollToBottom() {
		window.scrollTo(0, document.querySelector(".end").scrollHeight);
	}
	sendMessage() {
		this.chatroomService.sendMessage(this.chatroom.id, this.newMessage);
		this.newMessage.content = "";
	}
}
