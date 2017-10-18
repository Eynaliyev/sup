
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
//import { Facebook } from '@ionic-native/facebook';
import {UserService} from '../services/services';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  constructor(public http: Http,
  	//private facebook: Facebook,
  	public userService: UserService) {
    console.log('Hello AuthService');
  }
  /*
	facebookLogin(): firebase.Promise<any> {
		//check for platform if web return a promise,
		if(document.URL.includes('https://') || document.URL.includes('http://')){
			console.log("we're in the browser");
			let resPromise = new Promise<any>((resolve, reject) => {
				//set currentuser using the dummy data
				resolve(
			        this.userService.setCurrentUser({
						name: "Rustam Eynaliyev",
						email: "rustam.eynaliyev@gmail.com",
						photoUrl: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/13001075_10208279436177586_7844301951605599393_n.jpg?oh=557408b1b135f7f79592b50473b9b3af&oe=59B9D2CD",
						provider: "facebook.com",
						uid: 10211310937803232
			        })
				);
			});
			return resPromise;
		} else {
			console.log("we're on the device");
			return this.facebook.login(['email']).then( (response) => {
				const facebookCredential = firebase.auth.FacebookAuthProvider
				.credential(response.authResponse.accessToken);
				//just to see what data is usully returned - for mocking purposes
				console.log(response);

				return firebase.auth().signInWithCredential(facebookCredential)
				.then((success) => {
					console.log("Firebase success: " + success);
					console.log('current user.providerData: ', firebase.auth().currentUser.providerData[0]);
					this.userService.setCurrentUser();
          // DO NOT REMOVE IMMEDIATELY
          //creating a user profile - for user profile purposes?
					//firebase.database().ref('/userProfile').child(success.uid)
					//.set({ email: email });
					//});
					return success;
				})
				.catch((error) => {
				console.log("Firebase failure: " + JSON.stringify(error));
				return error;
				});
			}).catch((error) => { console.log(error) });
		}
	}
 	logoutUser(): firebase.Promise<void> {
		return firebase.auth().signOut();
 	}*/
}
