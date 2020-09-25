import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message-template';

@Component({
	selector: 'app-add-message',
	templateUrl: './add-message.component.html',
	styleUrls: [ './add-message.component.css' ]
})
export class AddMessageComponent implements OnInit {
	constructor(private messagesService: MessagesService) {}

	ngOnInit(): void {}

	add(text: string, user: string): void {
		console.log(`${user} said ${text}`);
		this.messagesService.addMessage({
			user: user,
			message: text
		} as Message);
	}
}
