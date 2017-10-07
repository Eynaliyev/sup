import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../services/services';
import { MessageService } from '../../services/services';
import { User } from '../../models/user.model';
import {Message} from '../../models/message.model';
import { UserProfilePage } from '../pages';
import { MeetSomebodyPage } from '../pages';

@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
    users: User[] = [];    
    messages: Message[] = [];
    id: number;
    currentUser = {
        id: 123
    }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService,
    private messageService: MessageService,
    private modalCtrl: ModalController
) {
    // get chatroom id
    // on page loaded - load message history - paginated
      }
    ionViewDidLoad(){
        let env = this;
        this.id = this.navParams.get('id');
        this.userService.getRandomUsers(5)
        .subscribe(res => {
            for (let i = 0; i < res.length; i++) {
                setTimeout(function() {
                    env.users.push(res[i]);
                }, 100 * i);
            }
            console.log(env.users);
        });        
        // load initial last 10 messages
        this.messageService.getMessages(this.id)
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                setTimeout(function() {
                    env.messages.push(res[i]);
                }, 100 * i);
            }    
        });
    }
    ngAfterViewInit() {  
        return new Promise(resolve => {
            let env = this;
            this.messageService.getMessages(this.id, 10)
            .then(newMessages => {
                console.log('newMessages: ', newMessages);
                for (let i = 0; i < newMessages.length; i++) {
                    setTimeout(function() {
                        env.messages.push(newMessages[i]);
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
    goToUser(user){
        this.navCtrl.push(UserProfilePage, user);
    }

    sendMessage(){
    
    }
  
}
