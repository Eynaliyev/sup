import {
	AuthService,
	ContactService,
	RequestService
} from "../../services/services";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ChatroomPage } from "../pages";
import { RequestsListPage } from "../pages";
import { User } from "../../models/models";
import { Contact, Request } from "../../models/models";
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
	allRequests: Request[] = [];

	constructor(
		private navCtrl: NavController,
		public authSrvc: AuthService,
		public contactSrvc: ContactService,
		public requestSrvc: RequestService
	) {
		console.log("ContactsListPage initialized");
		this.animateClass = { "zoom-in": true };
	} /*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ionViewWillEnter() {}
	ngAfterViewInit() {
		return new Promise(resolve => {
			let env = this;
			this.authSrvc.getUserData().then(
				user => {
					this.currentUser = user;
					this.contactSrvc.getContacts(user.id).subscribe(contacts => {
						this.contacts = contacts;
					});
					this.requestSrvc.getReceivedRequests(user.id).subscribe(requests => {
						this.allRequests = requests;
						this.requestsReceived = requests.filter(
							el => el.requestType === "RequestReceived"
						);
					});
					// setting contacts
					let contacts = this.contacts.sort((first, second) => {
						return (
							second.lastMessage.createdAt.getTime() -
							first.lastMessage.createdAt.getTime()
						);
					});
					for (let i = 0; i < contacts.length; i++) {
						setTimeout(function() {
							env.contacts.push(contacts[i]);
							console.log("contacts in contactsList: ", env.contacts);
						}, 100 * i);
					}
					// checking for new requests
					for (let i = 0; i < this.requestsReceived.length; i++) {
						if (
							this.requestsReceived[i].seen.indexOf(this.currentUser.id) === -1
						) {
							this.newRequests = true;
						}
					}
				},
				err => {
					console.error(err);
				}
			);
		});
	}
	doInfinite(infiniteScroll) {
		//Begin async operation
		this.ngAfterViewInit().then(() => {
			infiniteScroll.complete();
		});
	}
	viewRequests() {
		this.navCtrl.push(RequestsListPage, { requests: this.allRequests });
	}
	openChat(user) {
		this.navCtrl.push(ChatroomPage, { room: user.roomId });
	}
}
