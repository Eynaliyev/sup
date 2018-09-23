import {
	UserService,
	ContactService,
	RequestService,
	UtilService
} from "../../services/services";

import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ChatroomPage, RequestsListPage } from "../pages";
import { Contact, Request, User } from "../../models/models";
import * as moment from "moment";

@Component({
	selector: "page-contacts-list",
	templateUrl: "contacts-list.html"
})
export class ContactsListPage {
	contacts: Contact[] = [];
	animateClass: any;
	currentUser: User;
	newRequests: boolean = false;
	requestsReceived: Request[] = [];
	requestsSent: Request[] = [];
	allRequests: Request[] = [];

	constructor(
		private navCtrl: NavController,
		public userSrvc: UserService,
		public contactSrvc: ContactService,
		public requestSrvc: RequestService,
		public utilSrvc: UtilService
	) {
		console.log("ContactsListPage initialized");
		this.animateClass = { "zoom-in": true };
	} /*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.userSrvc
				.getCurrentUser()
				.take(2)
				.subscribe(user => {
					this.currentUser = user;
					this.contactSrvc.getContacts(user.id).subscribe(contacts => {
						this.contacts = contacts;
					});
					this.requestSrvc.getSentRequests(user.id).subscribe(requests => {
						this.allRequests = this.allRequests.concat(requests);
						this.requestsSent = requests;
					});
					this.requestSrvc.getReceivedRequests(user.id).subscribe(requests => {
						this.allRequests = requests;
						this.requestsReceived = requests;
					});
					// setting contacts
					let contacts = this.contacts.sort((first, second) => {
						return moment(second.lastMessage.createdAt).diff(
							moment(first.lastMessage.createdAt)
						);
					});
					for (let i = 0; i < contacts.length; i++) {
						setTimeout(function() {
							env.contacts.push(contacts[i]);
							console.log("contacts in contactsList: ", env.contacts);
						}, 100 * i);
					}
					// checking for new requests
					/*
					for (let i = 0; i < this.requestsReceived.length; i++) {
						if (
							this.requestsReceived[i].seen.indexOf(this.currentUser.id) === -1
						) {
							this.newRequests = true;
						}
					}*/
				});
		});
	}
	doInfinite(infiniteScroll) {
		//Begin async operation
		this.ngAfterViewInit()
			.then(() => {
				infiniteScroll.complete();
			})
			.catch(err => {
				console.log("Error:", err);
			});
	}
	viewRequests() {
		this.navCtrl.push(RequestsListPage, { requests: this.allRequests });
	}
	openChat(user) {
		let roomId = this.utilSrvc.uniqueRelId(this.currentUser.id, user.id);
		this.navCtrl.push(ChatroomPage, {
			room: roomId,
			privateConversation: true
		});
	}
}
