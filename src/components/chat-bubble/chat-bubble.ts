import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the ChatBubble component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
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
