import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { WizardModule } from 'primeng-extensions/components/wizard/wizard.js';
import { MessageService } from 'primeng/api';

import { InputMaskDemoComponent, inputmaskDemoRoute } from './';

const PRIMENG_STATES = [inputmaskDemoRoute];

@NgModule({
  imports: [
    PatrimonIoSharedModule,
    FormsModule,
    InputMaskModule,
    ToastModule,
    RadioButtonModule,
    WizardModule,
    RouterModule.forRoot(PRIMENG_STATES, { useHash: true }),
  ],
  declarations: [InputMaskDemoComponent],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoInputMaskDemoModule {}
