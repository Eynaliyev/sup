import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AlertController } from "ionic-angular";
import { Message } from "../models/models";
/*
  Generated class for the UtilService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilService {
	constructor(public http: Http, public alertCtrl: AlertController) {
		console.log("Hello UtilService Provider");
	}
	// generate a random name to put in firebase storage
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return (
			s4() +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			s4() +
			s4()
		);
	}
	// generats a uniqueId for a relationship e.g. sent request and etc
	uniqueRelId(from: string, to: string): string {
		if (from <= to) {
			return from.concat(to);
		} else {
			return to.concat(from);
		}
	}
	// calculates how much tiem in human words has passed since a specific date
	timeSince(date) {
		let newDate = Date.now();
		var seconds = Math.floor((newDate - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
	}
	doAlert(message, buttonText): void {
		console.log(message);
		let alert = this.alertCtrl.create({
			message: message,
			buttons: [buttonText]
		});
		alert.present();
	}
	// adds right or left to the position property depending on whether the sender is the current User
	addMessagePosition(messages: any[], currentUserId): any[] {
		let res = [];
		for (var i = 0; i < messages.length; i++) {
			res.push(messages[i]);
			if (messages[i].senderId === currentUserId) {
				res[i].position = "right";
			} else {
				res[i].position = "left";
			}
		}
		return res;
	}
	// adds time passed since the message was sent string for message
	addMessageTimeSince(messages: Message[]): any[] {
		let res = [];
		for (var i = 0; i < messages.length; i++) {
			res.push(messages[i]);
			res[i].time = this.timeSince(messages[i].date);
		}
		return res;
	}
	//a dummy method for ocming up with different dates
	createDate(n) {
		let time = new Date().getTime() - n;
		let date = new Date(time);
		return date;
	}
	presentFakedoorAlert(action: string) {
		const alert = this.alertCtrl.create({
			title: "Sorry",
			message: "This function is not available at this time",
			buttons: [
				{
					text: "Got it",
					role: "cancel",
					handler: () => {
						console.log("Got it clicked");
					}
				}
			]
		});
		alert.present();
	}
	finInstance(array: Array<any>, object): number {
		array.forEach((ins, index) => {
			if (this.deepEqual(ins, object)) {
				return index;
			}
		});
		return -1;
	}
	deepEqual(obj1, obj2) {
		JSON.stringify(obj1) === JSON.stringify(obj2);
	}
}
