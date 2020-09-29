import { Injectable } from '@angular/core';
import { Message } from './message-template';
import { MessageDTO } from './messageDTO';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {
	messages: MessageDTO[] = [];

	baseUrl = 'https://localhost:44378/api/messages';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) {}

	//Serwis odbiera wiadomość od "feed"
	//TODO: Update feed after adding a message
	addMessage(message: Message): Observable<Message> {
		if (!message.messageText) return;
		if (!message.username) {
			message.username = 'Anonymous'; //jeżeli username nie został podany
		}
		return this.http.put<Message>(this.baseUrl, message, this.httpOptions);
	}

	getMessages(): Observable<MessageDTO[]> {
		return this.http.get<MessageDTO[]>(this.baseUrl);
	}
}
