import { Injectable } from '@angular/core';
import { Message } from './message-template';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {
	messages: Message[] = [
		{
			user: 'Kuba',
			message: 'Hello everyone!'
		},
		{
			user: 'Fado',
			message: 'Woof Woof!'
		},
		{
			user: 'Kawhi',
			message: 'Boardman gets paid'
		}
	];

	constructor() {}

	addMessage(message: Message) {
		if (!message.message) return;
		if (!message.user) {
			this.messages.unshift({
				user: 'Anonymous',
				message: message.message
			});
		} else {
			this.messages.unshift(message);
		}
	}

	getMessages(): Message[] {
		return this.messages;
	}
}
