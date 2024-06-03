import { Injectable } from '@angular/core';
import { Observable, Subject, scan } from 'rxjs';

export interface Command {
  text?: string;
  type: 'success' | 'error' | 'clear';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messagesInput: Subject<Command>;
  messagesOutput:Observable<Command[]>

  constructor() {
    this.messagesInput = new Subject();
    this.messagesOutput = this.messagesInput
    .pipe(
      scan((acc : Command[], value:Command)=>{
        console.log('from pipe');
        
        if(value.type === 'clear'){
          return acc.filter((message)=> message.id !== value.id)
        }else{
        return [...acc,value];
        }
      },[])
    )

  }

  addSuccess(message: string) {
    let id = this.generateId();
    this.messagesInput.next({
      text: message,
      type: 'success',
      id:id
    })

    setTimeout(() => {
      this.clearMessage(id)
    }, 5000);
  }

  addError(message: string) {
    let id = this.generateId();
    this.messagesInput.next({
      text: message,
      type: 'error',
      id: id
    })
    setTimeout(() => {
      this.clearMessage(id)
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      type: 'clear',
      id: id
    })
  }

  generateId() {
    return Math.round(Math.random() * 1000);
  }
}
