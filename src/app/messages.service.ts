import {Injectable} from '@angular/core';
import {Message} from './message-template';
import {MessageDTO} from './messageDTO';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Observable<MessageDTO[]>;

  baseUrl = 'https://localhost:44378/api/messages';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.messages = of([]);
  }

  // Serwis odbiera wiadomość od "feed"
  // TODO: Update feed after adding a message
  addMessage(message: Message): Observable<Message> {
    if (!message.messageText) {
      return;
    }
    if (!message.username) {
      message.username = 'Anonymous'; // jeżeli username nie został podany
    }
    this.messages.pipe(map(source => {
      source.push({
        messageId: 0,
        username: message.username,
        messagetext: message.messageText
      });
      console.log('akcja!', source);
    })).subscribe();
    // this.messages.push();
    return this.http.put<Message>(this.baseUrl, message, this.httpOptions);
  }

  getMessages(): Observable<MessageDTO[]> {
    // return this.http.get<MessageDTO[]>(this.baseUrl);
    return this.messages;
  }
}
