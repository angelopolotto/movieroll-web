import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/http/auth/auth.service';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public authService: AuthService,
              public messageService: MessageService,
              public router: Router) { }

  async ngOnInit() {
    if (!this.authService.hasPublicToken()) {
      await this.router.navigate(['/']);
    } else if (!this.authService.isLogged()) {
      await this.router.navigate(['/login']);
    }
  }
}
