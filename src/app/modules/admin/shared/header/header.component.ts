import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidebar: boolean;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() toggleTheme: EventEmitter<any> = new EventEmitter();

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  toggleThemeColor() {
    console.log('Clicked!!!');
    this.toggleTheme.emit();
  }
}
