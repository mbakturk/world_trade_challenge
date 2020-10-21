import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Position} from '../../models/position';

const MENU_WIDTH = 200;

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

  position: { x: number, y: number };
  title: string;

  @Output() operation: EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef) {
  }

  show(title: string, position: Position): void {
    this.title = title;
    this.position = position;
    this.position.x = (MENU_WIDTH + position.x) > window.innerWidth ? position.x - MENU_WIDTH : position.x;
  }

  emitOperation(operation): void {
    this.position = undefined;
    this.operation.emit(operation);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutEvent(event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.position = undefined;
    }
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('document:wheel', ['$event'])
  handleScreenResizeEvent(): void {
    this.position = undefined;
  }

}
