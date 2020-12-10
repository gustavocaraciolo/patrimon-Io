import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { MessageService } from 'primeng/api';

import { SlideMenuDemoComponent, slidemenuDemoRoute } from './';

const PRIMENG_STATES = [slidemenuDemoRoute];

@NgModule({
  imports: [
    PatrimonIoSharedModule,
    CommonModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    ToastModule,
    ButtonModule,
    WizardModule,
    RouterModule.forRoot(PRIMENG_STATES, { useHash: true }),
  ],
  declarations: [SlideMenuDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoSlideMenuDemoModule {}
