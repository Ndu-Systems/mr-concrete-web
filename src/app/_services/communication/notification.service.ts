import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { MessageModel } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private messageService: MessageService
  ) { }

  errorMessage(summary: string, message: string) {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail: message,
      life: 7000
    });
  }

  successMassage(summary: string, msg: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail: msg,
      life: 7000
    });
  }

 genericMessage(message: MessageModel ) {
   this.messageService.add({
     severity: message.severity,
     summary: message.summary,
     detail: message.message,
     life: message.life
   });
 }
}
