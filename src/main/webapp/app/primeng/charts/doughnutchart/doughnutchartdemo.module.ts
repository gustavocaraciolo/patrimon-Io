import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';

import { DoughnutchartDemoComponent, doughnutchartDemoRoute } from '../../charts/doughnutchart';

const PRIMENG_STATES = [doughnutchartDemoRoute];

@NgModule({
  imports: [PatrimonIoSharedModule, ChartModule, RouterModule.forRoot(PRIMENG_STATES, { useHash: true })],
  declarations: [DoughnutchartDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoDoughnutchartDemoModule {}
