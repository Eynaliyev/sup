import { UtilService } from './../../shared/util.service';
import {
	Component,
	ViewChild,
	ViewEncapsulation,
	ElementRef
} from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { UserService, ChatroomService } from '../../services/services';
import { Chatroom, User, Message } from '../../models/models';
import {
	UserProfilePage,
	MeetSomebodyPage,
	ParticipantsListPage
} from '../pages';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'page-chatroom',
	templateUrl: 'chatroom.html',
	encapsulation: ViewEncapsulation.None
})
export class ChatroomPage {
	@ViewChild(Content)
	contentArea: Content;
	users: any[] = [];
	messages: any[] = [];
	chatroom: Chatroom;
	chatroomId: string = '';
	currentUser: User;
	bckgImgNum = Math.floor(Math.random() * 50);
	uniqueId = this.utilSrvc.guid();
	privateConversation: boolean = false;
	currentKey: string;
	lastPage: boolean = false;
	messagesPerPage: number = 10;
	// checking if it was loaded the first time
	initLoaded = false;

	newMessage: Message = {
		content: '',
		createdAt: moment().format('DD/MM/YYYY, hh:mm:ss'),
		id: this.uniqueId,
		roomId: '',
		sender: {
			id: '',
			firstName: '',
			lastName: '',
			imgUrl: ''
		},
		seen: []
	};
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private userService: UserService,
		private chatroomSrvc: ChatroomService,
		private alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {
		this.chatroomId = this.navParams.data['room'];
		this.privateConversation = this.navParams.data['privateConversation'];
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
				if (this.privateConversation) {
					return this.chatroomSrvc.getConversationById(this.chatroomId);
				} else {
					return this.chatroomSrvc.getChatroomById(this.chatroomId);
				}
			})
			.subscribe(chatroom => {
				this.chatroom = chatroom;
				if (!this.privateConversation) {
					localStorage.setItem(
						'currentChatroomId',
						JSON.stringify(chatroom.id)
					);
				}
				this.users = this.chatroom.participants; // TO DO: get all participants' info
			});
		this.chatroomSrvc.getMessages(this.chatroomId).subscribe(
			messages => {
				if (!this.initLoaded) {
					this.initLoaded = true;
					this.loadMessagesIntoPage(messages);
				}
			},
			err => {
				console.error(err);
			},
			() => {
				this.scrollToBottom();
			}
		);
	}
	ionViewDidLoad() {
		var objDiv = document.getElementsByClassName('scroll-content')[0];
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	exit() {
		localStorage.removeItem('currentChatroomId');
		this.chatroomSrvc.leaveChatroom(this.chatroomId, this.currentUser.id);
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	goToUser(id) {
		this.navCtrl.push(UserProfilePage, { user: id });
	}
	updateSeen(messages: Message[], id: string): Message[] {
		let result = [];
		messages.forEach(message => {
			if (message.seen.indexOf(id) === -1) {
				this.chatroomSrvc.updateSeen(this.chatroomId, message.id, id);
			}
			result.push(message);
		});
		return result;
	}
	loadMoreMessages(infiniteScroll) {
		this.initLoaded = false;
		let env = this;
		if (!this.lastPage) {
			this.chatroomSrvc
				.getMessages(this.chatroom.id, this.currentKey)
				.subscribe(
					newMessages => {
						if (!env.initLoaded) {
							newMessages.pop();
							console.log(this.messages);
							env.loadMessagesIntoPage(newMessages);
							infiniteScroll.complete();
							env.initLoaded = true;
						}
					},
					err => {
						console.error(err);
						infiniteScroll.complete();
					}
				);
		} else {
			infiniteScroll.complete();
		}
	}
	openParticipantsList() {
		if (this.users) {
			this.navCtrl.push(ParticipantsListPage, { participants: this.users });
		} else {
			const alert = this.alertCtrl.create({
				title: 'Wuf Wuf! Sorry Wuf',
				message: "Can't access the particiapnts list.",
				buttons: [
					{
						text: 'Ok',
						role: 'Ok',
						handler: () => {
							console.log('Ok clicked');
						}
					}
				]
			});
			alert.present();
		}
	}
	sendMessage() {
		this.chatroomSrvc.sendMessage(this.chatroom.id, this.newMessage);
		this.newMessage.content = '';
	}
	loadMessagesIntoPage(snapshot: any[]) {
		if (snapshot.length == 0) {
			this.lastPage = true;
			return;
		}
		if (snapshot.length < this.messagesPerPage) {
			this.lastPage = true;
		}
		// add position roperty
		let newMessages = this.snapshotToMessages(snapshot);
		this.currentKey = snapshot[0]['key'];

		// add position property
		let updatedMessages = this.utilSrvc.addMessagePosition(
			newMessages,
			this.currentUser.id
		);
		this.messages = updatedMessages.concat(this.messages);
	}
	scrollToBottom() {
		window.scrollTo(0, document.querySelector('.end').scrollHeight);
	}
	snapshotToMessages(snapshot: any[]): Message[] {
		let messages = [];
		snapshot.forEach(obj => messages.push(obj.payload.val()));
		return messages;
	}
}
