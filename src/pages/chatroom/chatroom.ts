import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/services';
import { MessageService } from '../../services/services';
import { User } from '../../models/user.model';
import {Message} from '../../models/message.model';
import { UserProfilePage } from '../pages';

@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
    users: User[] = [];    
	messages: Message[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService) {
    // get chatroom id
    // on page loaded - load message history - paginated
      }
    ionViewDidLoad(){
        let env = this;
        this.userService.getRandomUsers(5).subscribe(function(res){
            for (let i = 0; i < res.length; i++) {
                setTimeout(function() {
                    env.users.push(res[i]);
                }, 100 * i);
            }
            console.log(env.users);
        });        
    }
    goToUser(user){
        this.navCtrl.push(UserProfilePage, user);
    }

    sendMessage(){
    
    }
  
}
