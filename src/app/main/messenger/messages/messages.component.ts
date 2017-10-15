import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DialogService } from "app/main/messenger/dialog.service";
import { Dialog, DialogMessagesRequest, Message } from "app/main/messenger/models";
import { MessengerService } from "app/main/messenger/messenger.service";
import { UserService } from "app/main/user/user.service";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { Subscription } from "rxjs/Subscription";
import { UserDataService } from "app/main/user/user-data.service";
import { MessagesService } from "app/main/messenger/messages/messages.service";
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

declare var $;

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  private messages: Array<Message> = [];

  private subscription: Subscription;

  constructor(private messengerService: MessengerService,
              private dialogService: DialogService,
              private messagesService: MessagesService,
              private userService: UserService,
              private userDataService: UserDataService,
              private signalrService: SignalrService,
              private scrollbarService: MalihuScrollbarService) {

    this.subscription = new Subscription();
    
    this.subscription.add(this.dialogService.onDialogChanged.subscribe(dialog => { this.refreshMessages(); this.getUsersAvatars()}));
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    if(this.signalrService.connection) this.initializeSubscriptions();
  }

  ngOnInit() {
    this.getUsersAvatars();
    this.refreshMessages();
    
  }

  ngAfterViewInit(){
    this.scrollbarService.initScrollbar('#main-messages-container', { axis: 'y', theme: 'minimal-dark' });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private refreshMessages() {
    if(!this.dialogService.dialog || !this.dialogService.dialog.dialogId) return;
    let request = new DialogMessagesRequest(this.dialogService.dialog.dialogId, 0, 20)
    this.messengerService.getDialogMessages(request).subscribe(messages=>{
      this.messages = messages;
      this.messengerService.onMessagesLoaded.emit();
      this.scrollbarService.scrollTo('#main-messages-container',100000,{scrollInertia:0});
    });
  }

  private getUsersAvatars(){
    if(!this.dialogService.dialog || !this.dialogService.dialog.participants || !this.dialogService.dialog.dialogId) return;
    var logins = this.dialogService.dialog.participants.filter(x=>x != this.userService.user.login && !this.messagesService.usersAvatars.containsKey(x));
    if(logins.length == 0) return;
  }

  private onMessageRecieved(message: Message){
    if(!this.dialogService.dialog || this.dialogService.dialog.dialogId != message.dialogId) return;
    this.messages.push(message);
    this.scrollbarService.scrollTo('#main-messages-container',100000,{scrollInertia:0});
  }

  private onDialogRead(dialogId: string){
    this.messages.forEach(message => {
      message.isNew = false;
    });
  }

  private initializeSubscriptions(){
    this.messengerService.onMessageRecieved.subscribe(message=>{
      this.onMessageRecieved(message);
    });

    this.messengerService.onDialogRead.subscribe(dialogId=>{
      this.onDialogRead(dialogId);
    });
  }

}
