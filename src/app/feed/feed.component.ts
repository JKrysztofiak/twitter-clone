import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { MessageDTO } from '../messageDTO';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: [ './feed.component.css' ]
})
export class FeedComponent implements OnInit {
	constructor(private messagesService: MessagesService) {}

	messages = new BehaviorSubject<MessageDTO[]>([]);

	ngOnInit(): void {
		this.messagesService.subscribe(this.messages);
	}
}
