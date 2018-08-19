import { Component, OnInit } from '@angular/core';
import {Genre} from '../../models/api/genre';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/http/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public tabs: {media_type: string, genre: Genre}[] = [];
  public selectedIndex = 0;
  readonly minIndex = 0;

  constructor(public authService: AuthService,
              public messageService: MessageService,
              public router: Router) { }
  async ngOnInit() {
    if (!this.authService.hasPublicToken()) {
      await this.router.navigate(['/']);
    }
  }

  public result(media_type: string, genre: Genre) {
    this.tabs.push({media_type: media_type, genre: genre});
    if (this.selectedIndex <= this.minIndex) {
      this.selectedIndex = this.minIndex + 1;
    } else {
      this.selectedIndex++;
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selectedIndex--;
  }
}
