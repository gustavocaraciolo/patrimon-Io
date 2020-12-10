import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';

import { PiechartDemoComponent, piechartDemoRoute } from '../../charts/piechart';

const PRIMENG_STATES = [piechartDemoRoute];

@NgModule({
  imports: [PatrimonIoSharedModule, ChartModule, RouterModule.forRoot(PRIMENG_STATES, { useHash: true })],
  declarations: [PiechartDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoPiechartDemoModule {}
