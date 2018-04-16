import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Subscription } from "rxjs/Subscription";
import { Environment } from "../environment/environment";
import firebase from "firebase";
import { UserService } from "../services/services";
import { User } from "../models/models";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";
/*
  Generated class for the AuthService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthService {
	private fbSubscription: Subscription;
	private fsSubscription: Subscription;
	private user: User;
	private userDetails: firebase.User = null;
	// to break the circular dependency injection - will refactor later - perhaps with inheritance
	constructor(
		public http: Http,
		private _firebaseAuth: AngularFireAuth,
		public userService: UserService,
		private afs: AngularFirestore
	) {
		console.log("Hello AuthService");
	}
	// Get the userData from Firestore of the logged in user on Firebase.
	public getUserData(): Promise<User> {
		return new Promise(resolve => {
			if (this.user) {
				resolve(this.user);
			} else {
				return this.getUser();
			}
		});
	}
	// Get the authenticated user on Firebase and update the userData variable.
	public getUser(): Promise<firebase.User> {
		return new Promise((resolve, reject) => {
			if (this.fbSubscription) {
				this.fbSubscription.unsubscribe();
			}
			this.fbSubscription = this._firebaseAuth.authState.subscribe(
				(user: firebase.User) => {
					// User is logged in on Firebase.
					if (user) {
						this.get("users/" + user.uid)
							.then(ref => {
								if (this.fsSubscription) {
									this.fsSubscription.unsubscribe();
								}
								// Update userData variable from Firestore.
								this.fsSubscription = ref
									.valueChanges()
									.subscribe((user: User) => {
										this.user = user;
									});
							})
							.catch(() => {
								reject();
							});
					}
					resolve(user);
				}
			);
		});
	}

	// Change password of the logged in user on Firebase.
	public changePassword(password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._firebaseAuth.auth.currentUser
				.updatePassword(password)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// Login to Firebase using email and password combination.
	public loginWithEmail(email: string, password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._firebaseAuth.auth
				.signInWithEmailAndPassword(email, password)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// Register an account on Firebase with email and password combination.
	public registerWithEmail(email: string, password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._firebaseAuth.auth
				.createUserWithEmailAndPassword(email, password)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
	signInWithFacebook(): Promise<User> {
		//check for platform if web return a promise,
		if (document.URL.includes("https://") || document.URL.includes("http://")) {
			console.log("we're in the browser");
			let provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope("email");
			provider.addScope("public_profile");
			provider.addScope("user_birthday");

			return this._firebaseAuth.auth.signInWithPopup(provider);
		} else {
			// code for handling fb login when deployed to device with cordova
			console.log(
				"we're on the device"
			); /*
			return this.facebook.login(['email', 'public_profile']).then( (response) => {
				const facebookCredential = firebase.auth.FacebookAuthProvider
				.credential(response.authResponse.accessToken);
				//just to see what data is usully returned - for mocking purposes
				console.log('response: ', response, 'credential: ', facebookCredential);
				return firebase.auth().signInWithCredential(facebookCredential);
			}).catch((error) => { console.log(error) });*/
		}
	}
	signInWithGoogle() {
		return this._firebaseAuth.auth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
		);
	}
	isLoggedIn() {
		if (this.userDetails == null) {
			return false;
		} else {
			return true;
		}
	}
	logout(): Promise<any> {
		localStorage.removeItem("currentUser");
		return firebase.auth().signOut();
	}
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(resolve => {
			resolve(this.afs.doc(path));
		});
	}
}
