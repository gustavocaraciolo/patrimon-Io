import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { MessageService } from 'primeng/api';

import { TooltipDemoComponent, tooltipDemoRoute } from './';

const PRIMENG_STATES = [tooltipDemoRoute];

@NgModule({
  imports: [
    PatrimonIoSharedModule,
    TooltipModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
    WizardModule,
    RouterModule.forRoot(PRIMENG_STATES, { useHash: true }),
  ],
  declarations: [TooltipDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoTooltipDemoModule {}
