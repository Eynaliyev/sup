import { AuthService } from "./../../services/auth.service";
import { Component, ViewChild } from "@angular/core";
//import { NavController } from 'ionic-angular';
import { UserService } from "../../services/services";
import { User } from "../../models/models";
import { Slides } from "ionic-angular";

@Component({
	selector: "page-my-profile",
	templateUrl: "my-profile.html"
})
export class MyProfilePage {
	currentUser: User;
	currentTab = "about";
	image: any;
	photos: any = [];
	backGround: any;

	@ViewChild(Slides) slides: Slides;

	constructor(
		//private navCtrl: NavController,
		private userSrvc: UserService,
		private authSrvc: AuthService
	) {
		this.authSrvc.getUserData().then(user => {
			console.log("current user in myProfilePage: ", user);
			this.currentUser = user;
			this.photos = user.photos;
			this.backGround = user.photos[0].imgUrl;
			this.image = user.photos[0].imgUrl;
		});
	}
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}
	ionViewDidLoad() {
		console.log("ionViewDidLoad MyProfilePage");
	}
	updateProfile() {
		//console.log('update profile with: ', this.currentUser);
		this.userSrvc.updateUser(this.currentUser.id, this.currentUser);
	}
	changeTab(tab) {
		this.currentTab = tab;
		//console.log('currentTab in my-profile: ', this.currentTab);
	}
	addImage() {
		this.userSrvc.addImage(this.currentUser.id, this.image);
		//console.log(this.user.photos);
	}
	deleteImage() {
		this.userSrvc.deleteImage(this.currentUser.id, this.image);
		//console.log(this.user.photos);
	}
	changeImage(image) {
		this.image = image;
	}
	slideChanged() {
		let currentIndex = this.slides.getActiveIndex();
		this.image = this.currentUser.photos[currentIndex];
		//console.log('Current index, image, photos: ', currentIndex, this.currentImage, this.user.photos);
	}
}
