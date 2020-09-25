import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message-template';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: [ './feed.component.css' ]
})
export class FeedComponent implements OnInit {
	constructor(private messagesService: MessagesService) {}

	messages: Message[];

	ngOnInit(): void {
		this.messages = this.getMessages();
	}

	getMessages(): Message[] {
		return this.messagesService.getMessages();
	}
}
