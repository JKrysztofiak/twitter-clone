import { Component, OnInit, Input } from '@angular/core';
import { MessageDTO } from '../messageDTO';
import { Observable, BehaviorSubject } from 'rxjs';
import { MessagesService } from '../messages.service';

import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
	selector: 'app-single-tweet',
	templateUrl: './single-tweet.component.html',
	styleUrls: [ './single-tweet.component.css' ]
})
export class SingleTweetComponent implements OnInit {
	message: MessageDTO;

	edit = false;
	@Input() msgText;

	constructor(private messageService: MessagesService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.messageService.getMessage(params.get('id')).subscribe((msg) => {
				console.log(msg);
				this.message = msg;
				this.msgText = msg.messagetext;
			});
		});
	}

	removeMsg() {
		console.log(this.message);

		console.log(`Removing msg with id: ${this.message['messageid']}`);

		this.messageService.deleteMessage(this.message['messageid']);
	}

	toggleMsgEdit() {
		this.edit = !this.edit;
	}

	saveMsgEdit() {
		this.message.messagetext = this.msgText;
		console.log(`ST: Updating msg id. ${this.message['messageid']} with text: ${this.msgText}`);
		this.messageService.updateMessage(this.message['messageid'], this.msgText);
		this.toggleMsgEdit();
	}
}
