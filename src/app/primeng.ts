import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  imports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessageModule
  ],
  exports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule
  ]
})
export class PrimengModule {
}
