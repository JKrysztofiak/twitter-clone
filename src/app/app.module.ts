import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { FeedComponent } from './feed/feed.component';

import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { SingleTweetComponent } from './single-tweet/single-tweet.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ AppComponent, AddMessageComponent, FeedComponent, HomePageComponent, SingleTweetComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: '', component: HomePageComponent },
			{ path: 'message/:id', component: SingleTweetComponent }
		])
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
