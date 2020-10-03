import { Component, OnInit } from '@angular/core';
import { MessageDTO } from '../messageDTO';
import { Observable, BehaviorSubject } from 'rxjs';
import { MessagesService } from '../messages.service';

import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-single-tweet',
	templateUrl: './single-tweet.component.html',
	styleUrls: [ './single-tweet.component.css' ]
})
export class SingleTweetComponent implements OnInit {
	message: MessageDTO;

	constructor(private messageService: MessagesService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.messageService.getMessage(params.get('id')).subscribe((msg) => {
				console.log(msg);
				this.message = msg;
				// this.message = msg;
			});
		});
	}
}
