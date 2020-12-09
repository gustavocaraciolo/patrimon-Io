import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { ContasPagarComponent } from './contas-pagar.component';
import { ContasPagarDetailComponent } from './contas-pagar-detail.component';
import { ContasPagarUpdateComponent } from './contas-pagar-update.component';
import { ContasPagarDeleteDialogComponent } from './contas-pagar-delete-dialog.component';
import { contasPagarRoute } from './contas-pagar.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(contasPagarRoute)],
  declarations: [ContasPagarComponent, ContasPagarDetailComponent, ContasPagarUpdateComponent, ContasPagarDeleteDialogComponent],
  entryComponents: [ContasPagarDeleteDialogComponent],
})
export class PatrimonIoContasPagarModule {}
