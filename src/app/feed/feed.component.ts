import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../messages.service';
import {MessageDTO} from '../messageDTO';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private messagesService: MessagesService) {
  }

  messages: Observable<MessageDTO[]>;

  ngOnInit(): void {
    this.messages = this.getMessages();
  }

  getMessages(): Observable<MessageDTO[]> {
    return this.messagesService.getMessages();
  }
}
