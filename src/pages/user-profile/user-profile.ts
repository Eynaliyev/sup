import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/services';
import {User} from '../../models/models';
import { UtilService } from '../../shared/util.service';
import { AlertController } from 'ionic-angular';

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
  currentUser: User;
  tab: string = "vote";
  backGround: any;
  animateClass: any;
  image: any;
  items: any = [];
  friend: boolean = false;
  requested: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userSrvc: UserService,
    private utilSrvc: UtilService,
    public alertCtrl: AlertController
  ) {
      console.log(this.navParams.data);
      let id = this.navParams.get('user');
      this.userSrvc.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
        console.log('currentUser in userProfile: ', this.currentUser);
        this.userSrvc.getUserById(id)
        .subscribe(user => {
          this.user = user;
          this.items = user.photos;
          this.backGround = user.photos[0].imgUrl;
          this.image = user.photos[0].imgUrl;
          if(this.userSrvc.hasLiked(this.currentUser.id, user.id)) {
            this.requested = true;
          } else if(this.currentUser.contacts.forEach(contact => contact.id === this.user.id)){
            this.friend = true;
          }
          console.log('image, background, user in user profile: ', this.image, this.backGround, this.user);
        });
      });
      this.animateClass = { 'zoom-in': true };
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
  changeImage(image) {
    this.image = image
  }
  getHeight(tab){
      var height = "";
      if(tab == 'vote')
      height = "hidden";
      return height;
  }
  like() {
    // alert
    const alert = this.alertCtrl.create({
      title: 'Confirm Like',
      message: 'Do you want to add this person to contacts?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Like',
          handler: () => {
            console.log('Buy clicked');
            this.userSrvc.like(this.user.id);
          }
        }
      ]
    });
    alert.present();
  }
  unlike() {
    // alert
    let message = 'Are you sure?';
    if(this.currentUser.contacts.forEach(contact => contact.id === this.user.id)){
      message = "Do you want to cancel your friend request?";
    } else {
      message = "Do you want to remove user from your contacts list?"
    }
    // check if it's just a request or a friendship
    const alert = this.alertCtrl.create({
      title: 'Confirm Like',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Request cancelled');
            this.userSrvc.removeRequest(this.user.id);
          }
        }
      ]
    });
    alert.present();
  }
}
