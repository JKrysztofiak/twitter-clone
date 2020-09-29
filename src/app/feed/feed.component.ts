import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message-template';
import { MessageDTO } from '../messageDTO';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: [ './feed.component.css' ]
})
export class FeedComponent implements OnInit {
	constructor(private messagesService: MessagesService) {}

	messages: MessageDTO[];

	ngOnInit(): void {
		this.getMessages();
	}

	getMessages(): void {
		this.messagesService.getMessages().subscribe((msgArr) => (this.messages = msgArr));
	}
}
