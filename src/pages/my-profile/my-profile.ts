import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/services';
import { User } from '../../models/models';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
  user: User;
  currentTab = 'photos';
  currentImage;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public userSrvc: UserService
  ) {
    this.userSrvc.getCurrentUser()
    .then(user => {
      this.user = user;
      this.currentImage = user.photos[0];
      console.log('current user in myProfilePage: ', this.user);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
  updateProfile(){
    console.log('update profile with: ', this.user);
    this.userSrvc.updateUser(this.user);
  }
  changeTab(tab){
    this.currentTab = tab;
    console.log('currentTab in my-profile: ', this.currentTab);
  }
  addImage(){
    this.userSrvc.addImage(this.currentImage);
    console.log(this.user.photos);
  }
  deleteImage(){
    this.userSrvc.deleteImage(this.currentImage);
    console.log(this.user.photos);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.currentImage = this.user.photos[currentIndex];
    console.log('Current index, image, photos: ', currentIndex, this.currentImage, this.user.photos);
  }
}
