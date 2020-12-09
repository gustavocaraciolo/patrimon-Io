import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { ImovelComponent } from './imovel.component';
import { ImovelDetailComponent } from './imovel-detail.component';
import { ImovelUpdateComponent } from './imovel-update.component';
import { ImovelDeleteDialogComponent } from './imovel-delete-dialog.component';
import { imovelRoute } from './imovel.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(imovelRoute)],
  declarations: [ImovelComponent, ImovelDetailComponent, ImovelUpdateComponent, ImovelDeleteDialogComponent],
  entryComponents: [ImovelDeleteDialogComponent],
})
export class PatrimonIoImovelModule {}
