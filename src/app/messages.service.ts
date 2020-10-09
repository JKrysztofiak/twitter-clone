import { Injectable } from '@angular/core';
import { Message } from './message-template';
import { MessageDTO } from './messageDTO';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {
	messages: MessageDTO[];
	messagesSubject = new BehaviorSubject<MessageDTO[]>([]);

	baseUrl = 'https://localhost:44378/api/messages';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) {
		this.getMessages().subscribe((arr) => {
			this.messages = arr;
			this.update();
		});
	}

	subscribe(observer: Observer<MessageDTO[]>) {
		this.messagesSubject.subscribe(observer);
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

		this.http.put<MessageDTO>(this.baseUrl, message, this.httpOptions).subscribe((msg) => {
			this.messages.unshift(msg);
			this.update();
		});
	}

	getMessages(): Observable<MessageDTO[]> {
		return this.http.get<MessageDTO[]>(this.baseUrl);
	}

	getMessage(id: any): Observable<MessageDTO> {
		return this.http.get<MessageDTO>(`${this.baseUrl}/${id}`);
	}

	deleteMessage(id: any): void {
		let idNum = -1;
		let i = 0;
		for (let msg of this.messages) {
			if (msg['messageid'] == id) {
				idNum = i;
			}
			i++;
		}
		if (idNum == -1) return;
		this.http.delete<MessageDTO>(`${this.baseUrl}/${id}`).subscribe((x) => {
			this.messages.splice(idNum, 1);
			this.update();
		});
	}

	update() {
		this.messagesSubject.next(this.messages);
	}
}
