import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PrimengModule {
}
