import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../messages.service';
import {Message} from '../message-template';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  constructor(private messagesService: MessagesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // FEED wysyła treść wiadomości i autora do serwisu
  add(text: string, user: string): void {
    console.log(`${user} said ${text}`);
    const msg: Message = {
      username: user,
      messageText: text
    };
    this.messagesService.addMessage(msg); // .subscribe();
  }
}
