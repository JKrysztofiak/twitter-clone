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
		let idNum = this.findId(id);
		if (idNum == -1) return;
		this.http.delete<MessageDTO>(`${this.baseUrl}/${id}`).subscribe((x) => {
			this.messages.splice(idNum, 1);
			this.update();
		});
	}

	updateMessage(id, text) {
		console.log(`Service: Updating msg id. ${id} with text: ${text}`);
		this.http
			.post<MessageDTO>(`${this.baseUrl}/${id}`, {
				messageText: text
			})
			.subscribe((x) => {
				this.messages[this.findId(id)].messagetext = text;
				this.update();
			});
	}

	findId(listId: number): number {
		let id = 0;
		console.log('searching for id: ' + listId);

		for (let msg of this.messages) {
			console.log(msg['messageid']);
			if (msg['messageid'] == listId) {
				console.log(`ID FOUND IN LIST: ${id}`);
				return id;
			}
			id++;
		}
		return -1;
	}

	update() {
		this.messagesSubject.next(this.messages);
	}
}
