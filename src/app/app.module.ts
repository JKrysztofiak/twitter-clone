import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddMessageComponent} from './add-message/add-message.component';
import {FeedComponent} from './feed/feed.component';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AddMessageComponent, FeedComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
