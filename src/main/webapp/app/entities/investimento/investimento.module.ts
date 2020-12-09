import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from 'app/shared/shared.module';
import { InvestimentoComponent } from './investimento.component';
import { InvestimentoDetailComponent } from './investimento-detail.component';
import { InvestimentoUpdateComponent } from './investimento-update.component';
import { InvestimentoDeleteDialogComponent } from './investimento-delete-dialog.component';
import { investimentoRoute } from './investimento.route';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forChild(investimentoRoute)],
  declarations: [InvestimentoComponent, InvestimentoDetailComponent, InvestimentoUpdateComponent, InvestimentoDeleteDialogComponent],
  entryComponents: [InvestimentoDeleteDialogComponent],
})
export class PatrimonIoInvestimentoModule {}
