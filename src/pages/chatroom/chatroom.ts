import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/services';
import { ChatroomService } from '../../services/services';
import { User } from '../../models/user.model';
import {Message} from '../../models/message.model';
import { UserProfilePage } from '../pages';
import { MeetSomebodyPage } from '../pages';
import { UtilService } from '../../shared/util.service';
import {ParticipantsListPage} from '../pages';
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
    users: User[] = [];
    messages: any[] = [];
    id: number;
    currentUser = {
        id: 123
    }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private chatroomService: ChatroomService,
    private utilService: UtilService
) {
    // get chatroom id
    // on page loaded - load message history - paginated
      }
    ionViewDidLoad(){
        this.getUsers();
        // load initial last 10 messages
        this.getMessages();
    }
    ngAfterViewInit() {
      return new Promise(resolve => {
        let env = this;
        this.chatroomService.getMessages(this.id, 10)
        .then(newMessages => {
            console.log('newMessages: ', newMessages);
            // add position property
            let res = this.utilService.addMessagePosition(newMessages, this.currentUser.id);
            // add time passed since the mssage was sent
            //res = this.utilService.addMessageTimeSince(res);
            // To Do : add sender name based on participants ID, or nothing
            for (let i = 0; i < res.length; i++) {
                setTimeout(function() {
                    env.messages.push(res[i]);
                }, 100 * i);
            }
          resolve(true);
        });
      });
    }
    exit(){
        this.navCtrl.setRoot(MeetSomebodyPage);
    }
    doRefresh(infiniteScroll) {
        //Begin async operation
        this.ngAfterViewInit().then(()=>{
            infiniteScroll.complete();
        });
    }
    goToUser(userId){
        this.navCtrl.push(UserProfilePage, userId);
    }
    getMessages(){
      let env = this;
      this.chatroomService.getMessages(this.id, 10)
      .then(newMessages => {
          // add position property
          let res = this.utilService.addMessagePosition(newMessages, this.currentUser.id);
          console.log('newMessages: ', res);
          // add time passed since the mssage was sent
          //res = this.utilService.addMessageTimeSince(res);
          // To Do : add sender name based on participants ID, or nothing
          for (let i = 0; i < res.length; i++) {
              setTimeout(function() {
                  env.messages.push(res[i]);
              }, 100 * i);
          }
        });
    }
    getUsers(){
      let env = this;
      this.id = this.navParams.get('id');
      this.userService.getRandomUsers(5)
      .subscribe(res => {
          for (let i = 0; i < res.length; i++) {
              setTimeout(function() {
                  env.users.push(res[i]);
              }, 100 * i);
          }
      });
    }
    openParticipantsList(){
      this.navCtrl.push(ParticipantsListPage, {'participants': this.users});
    }
    sendMessage(){

    }

}
