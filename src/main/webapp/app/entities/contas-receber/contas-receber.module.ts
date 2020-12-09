import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { ContasReceberComponent } from './contas-receber.component';
import { ContasReceberDetailComponent } from './contas-receber-detail.component';
import { ContasReceberUpdateComponent } from './contas-receber-update.component';
import { ContasReceberDeleteDialogComponent } from './contas-receber-delete-dialog.component';
import { contasReceberRoute } from './contas-receber.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(contasReceberRoute)],
  declarations: [ContasReceberComponent, ContasReceberDetailComponent, ContasReceberUpdateComponent, ContasReceberDeleteDialogComponent],
  entryComponents: [ContasReceberDeleteDialogComponent],
})
export class PatrimonIoContasReceberModule {}
