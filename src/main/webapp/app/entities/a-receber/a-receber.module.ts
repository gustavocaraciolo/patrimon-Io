import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { AReceberComponent } from './a-receber.component';
import { AReceberDetailComponent } from './a-receber-detail.component';
import { AReceberUpdateComponent } from './a-receber-update.component';
import { AReceberDeleteDialogComponent } from './a-receber-delete-dialog.component';
import { aReceberRoute } from './a-receber.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(aReceberRoute)],
  declarations: [AReceberComponent, AReceberDetailComponent, AReceberUpdateComponent, AReceberDeleteDialogComponent],
  entryComponents: [AReceberDeleteDialogComponent],
})
export class PatrimonIoAReceberModule {}
