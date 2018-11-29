import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'chat-bubble',
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {
    @Input() message: any= {};
    @Output() select = new EventEmitter<any>();

    goToUser(id){
      this.select.emit(id);
    }
}
