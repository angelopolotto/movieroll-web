import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Genre} from '../../models/api/genre';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-discover-item',
  templateUrl: './discover-item.component.html',
  styleUrls: ['./discover-item.component.scss']
})
export class DiscoverItemComponent implements OnInit {
  @Input()
  genre: Genre;

  @Input()
  cardColor: String;

  @Input()
  media_type: String;

  @Output()
  OnClick: EventEmitter<Genre> = new EventEmitter();

  constructor(public messageServiece: MessageService) { }

  ngOnInit() {
  }

  public onClick(genre: Genre) {
    this.OnClick.emit(genre);
  }
}
