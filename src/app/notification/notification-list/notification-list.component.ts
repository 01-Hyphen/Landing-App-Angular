import { Component } from '@angular/core';
import { Command, NotificationService } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {

  messages$: Observable<Command[]>

  constructor(private notificationSvc: NotificationService) {
    this.messages$ = this.notificationSvc.messagesOutput;
    this.messages$.subscribe((res) => {
      console.log(res);

    })
  }

  clearMessage(id: number) {
    this.notificationSvc.clearMessage(id);
  }
}
