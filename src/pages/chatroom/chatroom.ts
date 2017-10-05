import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
	user: any;
	messages: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.user = navParams.get('user');
    
      this.messages= [{
        img: this.user.picture.large,
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    },{
        img: 'assets/img/thumbnail-duckling-1.jpg',
        position: 'right',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    },{
        img: 'assets/img/thumbnail-duckling-1.jpg',
        position: 'right',
        content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    },{
        img: this.user.picture.large,
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    },{
        img: 'assets/img/thumbnail-duckling-1.jpg',
        position: 'right',
        content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    },{
        img: this.user.picture.large,
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
    }]
      }
    
      sendMessage(){
        
      }
  
}
