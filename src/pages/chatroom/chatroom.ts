import { UtilService } from "./../../shared/util.service";
import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import { UserService, AuthService } from "../../services/services";
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
	@ViewChild(Content) content: Content;
	users: any[] = [];
	messages: any[] = [];
	chatroomId: string;
	chatroom: Chatroom;
	currentUser: User;
	backgroundImage;
	bckgImgNum = Math.floor(Math.random() * 50);
	uniqueId = this.utilSrvc.guid();

	newMessage: Message = {
		content: "",
		date: new Date(),
		id: this.uniqueId,
		senderId: "",
		roomId: "",
		senderName: "",
		senderImage: "",
		seen: []
	};
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userService: UserService,
		private chatroomService: ChatroomService,
		private alertCtrl: AlertController,
		private authSrvc: AuthService,
		private utilSrvc: UtilService
	) {
		let photoUrl = `../assets/images/background-${this.bckgImgNum}.jpg`;
		this.backgroundImage = `{'background-image': url('${photoUrl}')}`;
		// get chatroom id
		// on page loaded - load message history - paginated
		// get chatroom id from the nav params
		this.chatroomId = this.navParams.get("room");
		console.log("Chatroom page loaded with id:", this.chatroomId);
		this.userService
			.getCurrentUser()
			.take(2)
			.switchMap(user => {
				this.currentUser = user;
				this.newMessage.senderId = this.currentUser.id;
				this.newMessage.senderName = this.currentUser.firstName + " ";
				this.newMessage.senderImage = this.currentUser.profilePhoto.imgUrl;
				this.newMessage.seen.push(this.currentUser.id);
				console.log("currentUser: ", this.currentUser);
				return this.chatroomService.getChatroomById(this.chatroomId);
			})
			.subscribe(
				chatroom => {
					console.log("chatroom loaded from firebase: ", chatroom);
					this.chatroom = chatroom;
					if (!this.chatroom.maleParticipants && !chatroom.femaleParticipants) {
						console.error("something wrong - no participants in the room");
					} else if (
						this.chatroom.maleParticipants &&
						chatroom.femaleParticipants
					) {
						console.log("both male and female participants exist");
						this.users = chatroom.maleParticipants.concat(
							this.chatroom.femaleParticipants
						);
					} else if (this.chatroom.maleParticipants) {
						console.log("only male participants exist");
						this.users = chatroom.maleParticipants;
					} else {
						console.log("only female participants exist");
						this.users = chatroom.femaleParticipants;
					}
					this.newMessage.roomId = this.chatroom.id;
					console.log("participants in the room: ", this.users);
				},
				err => {
					console.error(err);
				}
			);
	}
	/*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	//scrolls to bottom whenever the page has loaded
	autoScroller: MutationObserver;

	ngOnInit() {
		this.autoScroller = this.autoScroll();
	}

	ngOnDestroy() {
		this.autoScroller.disconnect();
	}

	autoScroll(): MutationObserver {
		const autoScroller = new MutationObserver(this.scrollDown.bind(this));

		autoScroller.observe(this.messagesList, {
			childList: true,
			subtree: true
		});

		return autoScroller;
	}

	scrollDown(): void {
		this.scroller.scrollTop = this.scroller.scrollHeight;
		this.messageEditor.focus();
	}

	private get messageEditor(): HTMLInputElement {
		return <HTMLInputElement>document.querySelector("ion-input");
	}

	private get messagesList(): Element {
		return document.querySelector(".messages");
	}

	private get scroller(): Element {
		return this.messagesList.querySelector(".scroll-content");
	}

	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.chatroomService.getMessages(this.chatroomId, 10).subscribe(
				newMessages => {
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
					env.messages = [];
					for (let i = 0; i < updatedMessages.length; i++) {
						setTimeout(function() {
							env.messages.push(updatedMessages[i]);
						}, 100 * i);
					}
					resolve(true);
				},
				err => {
					console.error(err);
				}
			);
		});
	}
	exit() {
		this.chatroomService.leaveChatroom(this.chatroomId, this.currentUser.id);
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	doRefresh(infiniteScroll) {
		//Begin async operation
		this.ngAfterViewInit().then(() => {
			infiniteScroll.complete();
		});
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
		this.chatroomService.getMessages(this.chatroomId, 10).subscribe(
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
		this.newMessage.date = new Date();
		this.chatroomService.sendMessage(this.chatroomId, this.newMessage);
		// if the chatroom is in contacts
		if (
			this.currentUser.contacts
				.map(contact => contact.id)
				.indexOf(this.chatroomId) !== -1
		) {
			this.userService.updateLastMessage(
				this.currentUser.id,
				this.chatroomId,
				this.newMessage
			);
		}
		this.newMessage.content = "";
	}
}
