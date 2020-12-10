import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { MessageService } from 'primeng/api';

import { RTLDemoComponent, rtlDemoRoute } from './';

const PRIMENG_STATES = [rtlDemoRoute];

@NgModule({
  imports: [
    PatrimonIoSharedModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastModule,
    AccordionModule,
    WizardModule,
    RouterModule.forRoot(PRIMENG_STATES, { useHash: true }),
  ],
  declarations: [RTLDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoRTLDemoModule {}
