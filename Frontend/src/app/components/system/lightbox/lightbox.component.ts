import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent {

  @Input() imageUrl:string='';
  @Input() visible:boolean = false;
  @Output() closed = new EventEmitter<any>()

  close(){
    this.visible = false
    this.closed.emit()
  }
}
