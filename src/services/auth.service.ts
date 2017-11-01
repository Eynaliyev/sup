import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {UserService} from '../services/services';
import {User} from '../models/models';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  constructor(
		public http: Http,
  	private facebook: Facebook,
  	public userService: UserService
	) {
		console.log('Hello AuthService');

		}
	facebookLogin(): Promise<User> {
		//check for platform if web return a promise,
		if(document.URL.includes('https://') || document.URL.includes('http://')){
			console.log("we're in the browser");
			this.userService.setCurrentUser('10211310937803232', 'dummy');
			return new Promise(resolve => resolve(null));
		} else {
			console.log("we're on the device");
			return this.facebook.login(['email', 'public_profile']).then( (response) => {
				const facebookCredential = firebase.auth.FacebookAuthProvider
				.credential(response.authResponse.accessToken);
				//just to see what data is usully returned - for mocking purposes
				console.log('response: ', response, 'credential: ', facebookCredential);

				return firebase.auth().signInWithCredential(facebookCredential)
				.then((success) => {
					console.log("Firebase success: ", JSON.stringify(success));
					let providerData = firebase.auth().currentUser.providerData[0];
					console.log('current user.providerData: ', JSON.stringify(providerData));
					return this.userService.setCurrentUser(providerData.uid);
				})
				.catch((error) => {
					console.log("Firebase failure: " + JSON.stringify(error));
				return error;
				});
			}).catch((error) => { console.log(error) });
		}
	}
 	logoutUser() {
		localStorage.removeItem('currentUser');
		return firebase.auth().signOut();
 	}
}
