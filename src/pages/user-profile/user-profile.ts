import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/services';
import {User} from '../../models/models';
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
  animations: [
      trigger('flyInTopSlow1', [
          state("0", style({
              transform: 'translate3d(0,0,0)'
          })),
          transition('* => 0', [
              animate('200ms ease-in', keyframes([
                  style({ transform: 'translate3d(0,70px,0)', offset: 0 }),
                  style({ transform: 'translate3d(0,0,0)', offset: 1 })
              ]))
          ])
      ]),
      trigger('flyInTopSlow2', [
          state("0", style({
              transform: 'translate3d(0,0,0)'
          })),
          transition('* => 0', [
              animate('400ms ease-in', keyframes([
                  style({ transform: 'translate3d(0,70px,0)', offset: 0 }),
                  style({ transform: 'translate3d(0,0,0)', offset: 1 })
              ]))
          ])
      ]),
      trigger('flyInTopSlow3', [
          state("0", style({
              transform: 'translate3d(0,0,0)'
          })),
          transition('* => 0', [
              animate('600ms ease-in', keyframes([
                  style({ transform: 'translate3d(0,70px,0)', offset: 0 }),
                  style({ transform: 'translate3d(0,0,0)', offset: 1 })
              ]))
          ])
      ]),
      trigger('flyInTopSlow4', [
          state("0", style({
              transform: 'translate3d(0,0,0)'
          })),
          transition('* => 0', [
              animate('800ms ease-in', keyframes([
                  style({ transform: 'translate3d(0,70px,0)', offset: 0 }),
                  style({ transform: 'translate3d(0,0,0)', offset: 1 })
              ]))
          ])
      ]),
      trigger('flyInTopSlow5', [
          state("0", style({
              transform: 'translate3d(0,0,0)'
          })),
          transition('* => 0', [
              animate('800ms ease-in', keyframes([
                  style({ transform: 'translate3d(500px,0,0)', offset: 0 }),
                  style({ transform: 'translate3d(0,0,0)', offset: 1 })
              ]))
          ])
      ]),
      trigger('heroState', [
          state('zoom', style({
              transform: 'translateX(0) scale(1)'
          })),
          transition('* => zoom', [
              animate('800ms ease-in', keyframes([
                  style({ transform: 'translate3d(500px,0,0) scale(1)' })
              ]))
          ])
      ])
  ]
})
export class UserProfilePage {
  user: User;
  tab: string = "vote";
  backGround: any;
  animateClass: any;
  image: any;
  items: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userSrvc: UserService) {
      console.log(this.navParams.data);
      let id = this.navParams.get('user');
      this.userSrvc.getUserById(id)
      .then(user => {
        this.user = user;
        this.items = user.photos;
        this.backGround = user.profilePhoto;
        this.image = user.photos[0].imgUrl;
        console.log('user in user profile: ', this.user);
      });
      setTimeout(function() {}, 800);
      this.animateClass = { 'zoom-in': true };
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
  changeImage(image) {
    this.image = image
  }
  changeTab(tab) {
  }
  getHeight(tab){
      var height = "";
      if(tab == 'vote')
      height = "hidden";
      return height;
  }
}
