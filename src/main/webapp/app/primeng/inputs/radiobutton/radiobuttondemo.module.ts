import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { MessageService } from 'primeng/api';

import { RadioButtonDemoComponent, radiobuttonDemoRoute } from './';

const PRIMENG_STATES = [radiobuttonDemoRoute];

@NgModule({
  imports: [
    PatrimonIoSharedModule,
    FormsModule,
    RadioButtonModule,
    ToastModule,
    WizardModule,
    RouterModule.forRoot(PRIMENG_STATES, { useHash: true }),
  ],
  declarations: [RadioButtonDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoRadioButtonDemoModule {}
