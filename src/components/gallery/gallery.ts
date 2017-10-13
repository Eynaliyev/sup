import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the Gallery component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'gallery',
  templateUrl: 'gallery.html'
})
export class GalleryComponent {

  @Input() data: any;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  image: any;
  animateClass: any;

  constructor() {
      this.animateClass = { 'zoom-in': true };
  }

  changeImage(image){
    this.image = image;
    this.change.emit(this.image);
  }

}
