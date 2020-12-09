import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatrimonIoSharedModule } from '../shared/shared.module';

import { DASHBOARD_ROUTE, DashboardComponent } from './';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';

@NgModule({
  imports: [PatrimonIoSharedModule, RouterModule.forRoot([DASHBOARD_ROUTE], { useHash: true })],
  declarations: [DashboardComponent, PageOneComponent, PageTwoComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatrimonIoAppDashboardModule {}
