import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { APagarComponent } from './a-pagar.component';
import { APagarDetailComponent } from './a-pagar-detail.component';
import { APagarUpdateComponent } from './a-pagar-update.component';
import { APagarDeleteDialogComponent } from './a-pagar-delete-dialog.component';
import { aPagarRoute } from './a-pagar.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(aPagarRoute)],
  declarations: [APagarComponent, APagarDetailComponent, APagarUpdateComponent, APagarDeleteDialogComponent],
  entryComponents: [APagarDeleteDialogComponent],
})
export class PatrimonIoAPagarModule {}
