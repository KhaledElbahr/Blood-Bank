import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidebar: boolean;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() toggleTheme: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService) {}

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  toggleThemeColor() {
    console.log('Clicked!!!');
    this.toggleTheme.emit();
  }

  logout() {
    this.auth.logout();
  }
}
